import uuid
import os
from groq import Groq
import gradio as gr
from gtts import gTTS

client = Groq(api_key=os.getenv("groqkey"))

def get_chatbot_response(user_message, country, language, conversation_history):
    system_message = (
        f"You are an insurance expert specializing in providing concise and accurate information about insurance policies, claims, and regulations based on the laws in {country}. "
        f"Respond in {language}. Provide clear, factual information without offering personal advice or opinions. "
        "Include relevant policy details, coverage options, or regulatory references when possible."
    )

    if conversation_history:
        if conversation_history[0]["role"] == "system":
            conversation_history[0]["content"] = system_message
        else:
            conversation_history.insert(0, {"role": "system", "content": system_message})
    else:
        conversation_history.append({"role": "system", "content": system_message})
    
    conversation_history.append({"role": "user", "content": user_message})

    completion = client.chat.completions.create(
        model="deepseek-r1-distill-llama-70b",
        messages=conversation_history,
        temperature=0.3,
        top_p=0.95,
        stream=True,
        reasoning_format="hidden"
    )

    response = ""
    for chunk in completion:
        response += chunk.choices[0].delta.content or ""

    conversation_history.append({"role": "assistant", "content": response})

    chat_display = [
        (msg["content"], conversation_history[i + 1]["content"]) 
        for i, msg in enumerate(conversation_history[:-1]) if msg["role"] == "user"
    ]
    
    return conversation_history, chat_display

def text_to_audio(conversation_history, language):
    lang_map = {
        "English": "en",
        "Spanish": "es",
        "French": "fr",
        "German": "de",
        "Hindi": "hi",
        "Mandarin": "zh-cn",
        "Arabic": "ar"
    }
    lang_code = lang_map.get(language, "en")
    
    conversation_text = ""
    for msg in conversation_history:
        if msg["role"] == "user":
            conversation_text += f"You said: {msg['content']}\n"
        elif msg["role"] == "assistant":
            conversation_text += f"AI Insurance Chatbot responded with: {msg['content']}\n"
    
    if not conversation_text.strip():
        return None

    tts = gTTS(text=conversation_text, lang=lang_code)
    audio_filename = f"response_{uuid.uuid4().hex}.mp3"
    tts.save(audio_filename)
    return audio_filename


theme = gr.themes.Ocean(
    text_size="lg",
    font=[gr.themes.GoogleFont('DM Sans'), 'ui-sans-serif', 'system-ui', 'sans-serif'],
).set(
    body_text_size='*text_md',
    background_fill_secondary='*secondary_100',
    chatbot_text_size='*text_md',
    input_radius='*radius_md',
    input_text_size='*text_md',
)

custom_css = """
.title-text {
    background: #00A0B0;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    display: inline-block;
    width: fit-content;
    font-weight: bold;
    text-align: center;
    font-size: 45px;
}
.insurance-button {
    border: 1px solid #00A0B0;
    background-color: transparent;
    font-size: 15px;
    padding: 5px 15px;
    border-radius: 16px;
    margin: 0 5px;
}
.insurance-button:hover {
    background: linear-gradient(90deg, #00A0B0, #00FFEF) !important;
    color: white !important;
}
.country-language-container .gr-dropdown {
    font-size: 10px;
    max-height: 100px;
}
"""

def clear_history():
    return []


with gr.Blocks(theme=theme, css=custom_css) as demo:

    gr.HTML("<h2 class='title-text'>🛡️ AI Insurance Chatbot</h2>")
    gr.Markdown("### Welcome! Pick your country, choose a language, and describe your insurance-related query. We're here to assist you!")

    with gr.Row(elem_classes="country-language-container"):
        country_input = gr.Dropdown(
            ["Canada", "United States", "United Kingdom", "Spain", "France", "Germany", "India", "China", "Lebanon", "Other"],
            label="🌍 Country for Insurance Regulations",
            interactive=True
        )
        language_input = gr.Dropdown(
            ["English", "Spanish", "French", "German", "Hindi", "Mandarin", "Arabic"],
            label="🗣️ Language Output",
            interactive=True
        )

    custom_country_input = gr.Textbox(label="Enter Country (if not listed)", visible=False)

    conversation_state = gr.State([])
    insurance_state = gr.State("")

    chatbot = gr.Chatbot(label="💬 Chat History", min_height="500px")
    chatbot.clear(fn=clear_history, outputs=conversation_state)
    
    with gr.Row():
        auto_btn = gr.Button("🚗 Auto", elem_classes="insurance-button")
        home_btn = gr.Button("🏠 Home", elem_classes="insurance-button")
        health_btn = gr.Button("🏥 Health", elem_classes="insurance-button")
        life_btn = gr.Button("❤️ Life", elem_classes="insurance-button")
        travel_btn = gr.Button("✈️ Travel", elem_classes="insurance-button")
        business_btn = gr.Button("🏢 Business", elem_classes="insurance-button")
        liability_btn = gr.Button("⚖️ Liability", elem_classes="insurance-button")
        pet_btn = gr.Button("🐾 Pet", elem_classes="insurance-button")

    with gr.Row(equal_height=True):
        scenario_input = gr.Textbox(
            label="💡 Type your message...", 
            placeholder="Describe your insurance query...", 
            interactive=True,
        )
        submit_btn = gr.Button("Send", variant="primary", scale=0)

    def update_insurance_selection(current, new_selection):
        if "Insurance: " in current:
            parts = current.split("Insurance: ", 1)
            additional_text = parts[1] if len(parts) > 1 else ""
        else:
            additional_text = current
        return f"{new_selection} Insurance: {additional_text}"

    for btn, insurance in zip(
        [auto_btn, home_btn, health_btn, life_btn, travel_btn, business_btn, liability_btn, pet_btn],
        ["Auto", "Home", "Health", "Life", "Travel", "Business", "Liability", "Pet"]
    ):
        btn.click(lambda current, insurance=insurance: update_insurance_selection(current, insurance), inputs=scenario_input, outputs=scenario_input)

    def submit(country, custom_country, language, scenario, conversation_state):
        selected_country = custom_country if country == "Other" else country
        updated_history, chat_display = get_chatbot_response(
            scenario, selected_country, language, conversation_state
        )
        return updated_history, chat_display, ""

    country_input.change(lambda c: gr.update(visible=c == "Other"), inputs=country_input, outputs=custom_country_input)

    submit_btn.click(
        submit, 
        inputs=[country_input, custom_country_input, language_input, scenario_input, conversation_state], 
        outputs=[conversation_state, chatbot, scenario_input]
    )

    scenario_input.submit(
        fn=submit, 
        inputs=[country_input, custom_country_input, language_input, scenario_input, conversation_state], 
        outputs=[conversation_state, chatbot, scenario_input]
    )

    gr.HTML("<br><br>")
    gr.Markdown("### Audio Output\nClick the **Read Conversation** button to have the entire conversation read aloud for you.")

    read_conversation_btn = gr.Button("🔊 Read Conversation", variant="primary")
    response_audio_output = gr.Audio(label="Conversation Audio")
    
    read_conversation_btn.click(
        fn=text_to_audio,
        inputs=[conversation_state, language_input],
        outputs=response_audio_output
    )
    
demo.launch()