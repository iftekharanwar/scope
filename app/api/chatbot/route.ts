import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  // This is a simplified example - in a real production environment,
  // you would likely use a more robust approach to serve the Python application

  // Return HTML that will load the chatbot in an iframe or redirect to a deployed version
  return new NextResponse(
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>AI Insurance Chatbot</title>
      <style>
        body, html {
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: hidden;
        }
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(to bottom, #f0f9ff, #e6f7ff);
          font-family: 'DM Sans', sans-serif;
        }
        .message {
          background: rgba(255, 255, 255, 0.8);
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          text-align: center;
        }
        h1 {
          color: #00A0B0;
          margin-bottom: 1rem;
        }
        p {
          color: #333;
          line-height: 1.6;
        }
        .button {
          display: inline-block;
          background: linear-gradient(90deg, #00A0B0, #00FFEF);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 2rem;
          text-decoration: none;
          font-weight: bold;
          margin-top: 1rem;
          transition: all 0.3s ease;
        }
        .button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 10px rgba(0, 160, 176, 0.3);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="message">
          <h1>🛡️ AI Insurance Chatbot</h1>
          <p>
            The chatbot application needs to be deployed separately as it requires a Python runtime environment.
            In a production environment, this would be a link to the deployed Gradio application.
          </p>
          <p>
            For demonstration purposes, you can view the Python code and deploy it in your own environment.
          </p>
          <a href="/" class="button">Return to Home</a>
        </div>
      </div>
    </body>
    </html>
  `,
    {
      headers: {
        "Content-Type": "text/html",
      },
    },
  )
}
