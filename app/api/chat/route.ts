import { type NextRequest, NextResponse } from "next/server"
import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

const mockResponses: Record<string, string> = {
  auto: `In Europe, auto insurance (also called motor insurance) varies by country but generally includes these common types:

1. Third-Party Liability Insurance (MTPL): Mandatory in all EU countries, this covers damage you cause to other people and their property. This is the minimum legal requirement across Europe and is known as:
   - "Responsabilità Civile Auto" (RCA) in Italy
   - "Kraftfahrzeug-Haftpflichtversicherung" in Germany
   - "Assurance Responsabilité Civile" in France

2. Comprehensive Coverage (Kasko/Casco): Covers damage to your own vehicle regardless of fault, including:
   - Collision damage
   - Theft and vandalism
   - Fire damage
   - Natural disasters and weather damage

3. Green Card: Extends your insurance coverage when traveling between European countries.

4. Glass Coverage: Specifically covers windshield and window damage.

5. Legal Protection: Covers legal expenses if you need to take action after an accident.

6. Driver Injury Protection: Covers medical expenses for the driver, as third-party liability only covers passengers and other parties.

7. Roadside Assistance: Provides help with breakdowns, towing, and other emergencies.

EU Regulation Information:
- The EU Motor Insurance Directive (2009/103/EC) ensures minimum coverage requirements across all member states
- Fourth Motor Insurance Directive allows direct claims against insurers in cross-border accidents
- Fifth Motor Insurance Directive increased minimum coverage amounts and simplified claims procedures
- eCall system (mandatory in new cars since 2018) automatically alerts emergency services in case of accidents

Cross-Border Coverage:
- Green Card system ensures recognition of insurance across 48 countries
- Visiting Drivers' Bureau handles claims when foreign drivers cause accidents
- Direct Settlement Agreements exist between many EU countries for faster claims processing

The specific requirements and premiums vary by country, with Northern European countries generally having higher premiums but more comprehensive coverage than Southern European countries.`,
  health: `Health insurance in Europe varies significantly by country, with most nations offering a combination of public and private systems:

1. Public Healthcare Systems:
   - National Health Service (NHS) in the UK: Tax-funded universal healthcare
   - Servizio Sanitario Nazionale (SSN) in Italy: Universal coverage for all citizens and legal residents
   - Statutory Health Insurance in Germany: Mandatory insurance through public or private providers
   - Sistema Nacional de Salud (SNS) in Spain: Universal coverage with regional administration
   - Assurance Maladie in France: Social security-based system with complementary private insurance

2. Private Supplementary Insurance: Offers additional coverage beyond public systems, including:
   - Faster access to specialists
   - Private hospital rooms
   - Dental and vision care
   - Alternative therapies
   - Coverage when traveling within the EU and internationally

3. European Health Insurance Card (EHIC) or Global Health Insurance Card (GHIC): Provides access to medically necessary state-provided healthcare during temporary stays in other EU countries.

4. Cross-Border Healthcare Directive: Allows EU citizens to seek healthcare in other EU countries with potential reimbursement from their home country's system.

5. Long-term Care Insurance: Available in countries like Germany and France, covering nursing home care and home healthcare services.

EU Healthcare Regulation Information:
- Regulation 883/2004: Coordinates social security systems across the EU
- Directive 2011/24/EU (Cross-Border Healthcare): Establishes patients' rights to access healthcare in other EU countries
- European Reference Networks (ERNs): Connect healthcare providers across Europe for rare diseases
- European Medicines Agency (EMA): Ensures all medicines available in the EU are safe, effective, and high quality

Cross-Border Healthcare Rights:
- Right to reimbursement for treatment abroad at home country rates
- Prior authorization required only for overnight hospital stays or highly specialized care
- National Contact Points in each country provide information on cross-border healthcare
- S2 form allows planned medical treatment in another EU country

Premium costs vary significantly across Europe:
- Northern Europe (Germany, Netherlands): €300-500 monthly for comprehensive private insurance
- Southern Europe (Spain, Italy): €50-150 monthly for supplementary private coverage
- Eastern Europe: €20-100 monthly for private plans

Most European countries have universal healthcare systems with varying levels of cost-sharing through co-payments, deductibles, or complementary private insurance.`,
  home: `Home insurance in Europe (also called buildings or contents insurance) varies by country but typically includes:

1. Buildings Insurance: Covers the physical structure of your home against:
   - Fire and smoke damage
   - Water damage from burst pipes
   - Storm and flood damage
   - Subsidence
   - Vandalism and theft damage
   - In Italy, this is known as "Assicurazione Casa" or "Polizza Abitazione"

2. Contents Insurance: Protects your personal belongings including:
   - Furniture and appliances
   - Electronics and valuables
   - Clothing and personal items
   - Often with specific limits for high-value items

3. Personal Liability Coverage: Protects you if someone is injured in your home or if you accidentally damage someone else's property.

4. Legal Protection: Covers legal expenses for property disputes.

5. Alternative Accommodation: Provides temporary housing if your home becomes uninhabitable.

6. Natural Disaster Coverage: In high-risk areas, specific coverage for earthquakes (especially in Italy and Greece) or floods may be required.

7. Home Emergency Coverage: Covers urgent repairs to essential systems like heating or plumbing.

EU Home Insurance Regulation Information:
- The EU Insurance Distribution Directive (IDD) standardizes how home insurance is sold across member states
- The European Standard EN 45545 sets fire protection standards for buildings
- The EU Floods Directive requires member states to assess and manage flood risks, affecting insurance requirements
- The European Insurance and Occupational Pensions Authority (EIOPA) provides guidelines for home insurance products

Cross-Border Property Ownership:
- EU citizens can purchase property in any member state with the same insurance rights as locals
- The Brussels I Regulation determines which courts have jurisdiction in cross-border property disputes
- The Rome I Regulation governs which country's laws apply to insurance contracts for properties in different EU countries
- The European Insurance Contract Law Project aims to harmonize insurance contract terms across the EU

In many European countries, home insurance is not legally mandatory (except for mortgage holders), but it's highly recommended. Coverage requirements and premiums vary significantly between countries like Italy, France, Germany, and Spain.`,
  life: `Life insurance in Europe offers various options to protect your family's financial future:

1. Term Life Insurance: Provides coverage for a specific period (typically 5-30 years) with fixed premiums. Popular in countries like Italy ("Assicurazione Vita Temporanea"), Germany ("Risikolebensversicherung"), and the UK.

2. Whole Life Insurance: Offers lifetime coverage with a savings component. Known as:
   - "Assicurazione Vita Intera" in Italy
   - "Kapitallebensversicherung" in Germany
   - "Assurance Vie Entière" in France

3. Unit-Linked Insurance: Popular in the UK and across Europe, combining life insurance with investment opportunities in mutual funds.

4. Endowment Policies: Common in many European countries, providing both death benefits and maturity benefits if the policyholder survives the policy term.

5. Group Life Insurance: Often provided through employers as part of benefits packages.

6. Mortgage Life Insurance: Specifically designed to pay off your mortgage if you die before it's fully repaid.

EU Life Insurance Regulation Information:
- The Solvency II Directive (2009/138/EC) establishes capital requirements for insurers to ensure they can meet obligations
- The Insurance Distribution Directive (2016/97/EU) regulates how life insurance is sold across the EU
- The PRIIPs Regulation requires standardized Key Information Documents (KIDs) for investment-based insurance products
- The GDPR impacts how insurers handle personal and health data for underwriting

Cross-Border Life Insurance Benefits:
- The EU Freedom of Services principle allows purchasing policies from insurers in other member states
- The Third Life Insurance Directive enables "single passport" for insurers to operate across the EU
- The EU Succession Regulation (Brussels IV) affects how life insurance benefits are distributed across borders
- The EU Tax Directive prevents double taxation on cross-border life insurance payouts

European life insurance policies often include:
- Tax advantages that vary by country (particularly in France and Luxembourg)
- Cross-border portability within the EU
- Inheritance planning benefits
- Surrender values for early policy termination`,
  travel: `Travel insurance in Europe offers protection for both intra-EU and international travel:

1. Schengen Travel Insurance: Required for non-EU visitors to the Schengen Area, covering medical emergencies up to €30,000.

2. European Health Insurance Card (EHIC) Supplement: Extends the basic coverage provided by the EHIC/GHIC for EU citizens traveling within Europe.

3. Trip Cancellation/Interruption: Reimburses prepaid expenses if you need to cancel or cut short your trip due to covered reasons such as:
   - Illness or injury
   - Death of a family member
   - Severe weather or natural disasters
   - Strikes affecting public transportation

4. Medical Coverage: Particularly important when traveling outside your home country, as public healthcare systems may not cover non-residents or may require payment.

5. Medical Repatriation: Covers transportation back to your home country if medically necessary, which can be extremely expensive without insurance.

6. Baggage Protection: Covers lost, stolen, or damaged luggage during your travels within Europe or internationally.

7. Travel Delay Coverage: Provides compensation for additional expenses due to significant delays in your journey.

8. Winter Sports Coverage: Special protection for skiing and other winter activities, popular in Alpine destinations like Italy, Switzerland, France, and Austria.

9. Cruise Coverage: Specific protection for Mediterranean and Northern European cruises.

EU Travel Insurance Regulation Information:
- The EU Package Travel Directive (2015/2302) requires tour operators to provide insolvency protection
- EU Regulation 261/2004 establishes passenger rights for flight delays and cancellations
- The EU Cross-Border Healthcare Directive allows planned medical treatment in other EU countries
- The European Insurance Card (EHIC/GHIC) system provides reciprocal healthcare access across the EEA

Cross-Border Travel Protection:
- EU citizens have the right to consular protection from any EU country's embassy when traveling outside the EU
- The EU Digital COVID Certificate framework standardized travel requirements during the pandemic
- The EU Consumer Rights Directive applies to online travel insurance purchases across borders
- The EU General Data Protection Regulation (GDPR) protects travelers' personal data collected by insurers

Travel insurance is especially important for:
- Travel outside your home EU country
- Adventure activities and winter sports
- Cruises in the Mediterranean or Baltic Sea
- Travelers with pre-existing medical conditions

Many European countries offer specialized travel insurance products tailored to regional needs and travel patterns.`,
  business: `Business insurance in Europe provides protection for companies operating within the EU regulatory framework:

1. Commercial General Liability: Known as "Responsabilità Civile d'Impresa" in Italy or "Betriebshaftpflichtversicherung" in Germany, covers third-party claims for bodily injury and property damage.

2. Professional Indemnity Insurance: Essential for service providers across Europe, protecting against claims of negligence or inadequate work. Required by law for certain professions in many EU countries.

3. Directors and Officers (D&O) Liability: Protects company executives from personal liability, increasingly important under EU corporate governance regulations.

4. Property Insurance: Covers business premises and contents against risks like fire, theft, and natural disasters, with specific considerations for historic buildings in European cities.

5. Business Interruption: Particularly important in Europe where business recovery after disasters may be complicated by historic preservation requirements or complex supply chains.

6. Employer's Liability: Mandatory in most European countries, covering workplace injuries and illnesses. Known as:
   - "Assicurazione contro gli infortuni sul lavoro" in Italy (managed by INAIL)
   - "Gesetzliche Unfallversicherung" in Germany
   - "Employers' Liability Insurance" in the UK

7. Cyber Insurance: Increasingly critical under the EU's General Data Protection Regulation (GDPR), covering data breaches and associated fines.

8. Environmental Liability: Required under the EU Environmental Liability Directive for businesses whose operations pose environmental risks.

9. Credit Insurance: Popular in Europe to protect against non-payment by customers, especially for cross-border trade within the EU.

10. Package Policies: Many European insurers offer industry-specific packages tailored to local business environments and regulations.

EU Business Insurance Regulation Information:
- The EU Insurance Distribution Directive (IDD) standardizes how business insurance is sold across member states
- The EU Environmental Liability Directive (2004/35/CE) requires environmental damage coverage for certain industries
- The EU Product Liability Directive (85/374/EEC) establishes strict liability for defective products
- The EU General Data Protection Regulation (GDPR) has driven demand for cyber liability insurance

Cross-Border Business Operations:
- The EU Freedom of Establishment principle allows businesses to operate in any member state
- The Services Directive facilitates cross-border service provision with harmonized insurance requirements
- The European Company Statute (Societas Europaea) enables companies to operate across the EU with unified insurance coverage
- The EU Late Payment Directive impacts credit insurance needs for cross-border transactions

The EU's Insurance Distribution Directive standardizes certain aspects of business insurance across member states, though specific requirements still vary by country.`,
  liability: `Liability insurance in Europe protects individuals and businesses from financial losses when legally responsible for harm to others:

1. Personal Liability Insurance: Known as "Responsabilità Civile" in Italy or "Privathaftpflichtversicherung" in Germany, this covers:
   - Accidental damage to others' property
   - Injuries to third parties in your home or during daily activities
   - Legal defense costs for covered claims
   - Often included in home insurance policies

2. Professional Liability Insurance: Mandatory for many professions across Europe, including:
   - Medical professionals (doctors, dentists, pharmacists)
   - Legal professionals (lawyers, notaries)
   - Financial advisors and accountants
   - Architects and engineers

3. Product Liability Insurance: Particularly important under the EU Product Liability Directive, which establishes strict liability for defective products.

4. Environmental Liability: Required under the EU Environmental Liability Directive for businesses whose operations could cause environmental damage.

5. Directors and Officers (D&O) Liability: Increasingly important under European corporate governance regulations.

6. Public Liability Insurance: Essential for businesses with public-facing operations, covering injuries or property damage to customers or visitors.

7. Employer's Liability: Mandatory in most European countries, covering workplace injuries to employees.

EU Liability Insurance Regulation Information:
- The EU Product Liability Directive (85/374/EEC) establishes strict liability for defective products
- The EU Environmental Liability Directive (2004/35/CE) implements the "polluter pays" principle
- The EU Professional Qualifications Directive (2005/36/EC) affects liability insurance requirements for regulated professions
- The EU Motor Insurance Directive requires minimum third-party liability coverage in all member states

Cross-Border Liability Considerations:
- The Brussels I Regulation determines which courts have jurisdiction in cross-border liability disputes
- The Rome II Regulation governs which country's laws apply to non-contractual obligations
- The EU Alternative Dispute Resolution Directive provides mechanisms for resolving cross-border liability claims
- The European Order for Payment procedure simplifies recovery of uncontested cross-border claims

European liability insurance features:
- Cross-border coverage within the EU
- Compliance with country-specific mandatory insurance requirements
- Legal defense in multiple jurisdictions
- Coverage for EU regulatory penalties in some cases

The EU's Rome II Regulation governs which country's laws apply to non-contractual liability cases, affecting how claims are handled across borders.`,
  pet: `Pet insurance in Europe helps cover veterinary costs for your pets, with some unique features compared to other regions:

1. Accident and Illness Coverage: The most common type across Europe, covering:
   - Veterinary consultations and treatments
   - Surgery and hospitalization
   - Medications and prescription diets
   - Diagnostic tests and imaging
   - Known as "Assicurazione Animali Domestici" in Italy or "Tierkrankenversicherung" in Germany

2. Third-Party Liability Coverage: Particularly important in Europe, covering damages or injuries your pet causes to others. This is often mandatory for certain dog breeds in countries like Italy, Germany, and Switzerland.

3. Travel Coverage: Covers veterinary care when traveling with your pet within the EU, important with the EU Pet Passport system.

4. Preventive Care: Available as an add-on in most European countries, covering routine care like vaccinations and annual check-ups.

5. Hereditary and Congenital Conditions: Coverage varies significantly between European insurers, with some offering more comprehensive coverage than others.

EU Pet Insurance Regulation Information:
- The EU Pet Travel Regulation (576/2013) establishes requirements for pet movement across borders
- The EU Animal Health Law (Regulation 2016/429) impacts pet health requirements and insurance
- The EU Veterinary Medicinal Products Regulation affects coverage for medications
- The EU Identification of Equidae Regulation impacts insurance for horses and ponies

Cross-Border Pet Considerations:
- The EU Pet Passport system allows seamless travel with pets across member states
- The TRACES (Trade Control and Expert System) tracks pet movement for health and safety
- The EU Zoonoses Directive impacts coverage for diseases transmissible between animals and humans
- The European Convention for the Protection of Pet Animals sets minimum standards for pet welfare

European pet insurance considerations:
- EU Pet Travel Regulations compliance
- Microchipping requirements (mandatory in many EU countries)
- Breed-specific regulations (some breeds require special insurance in certain countries)
- Coverage for pets in multiple EU countries for frequent travelers

Most European pet insurance operates on a reimbursement model, though some providers in countries like the UK offer direct payment to veterinarians. Premiums typically range from €10-€50 monthly depending on the pet's species, breed, age, and your country of residence.

The EU's strong consumer protection laws generally ensure more standardized coverage terms compared to other regions.`,
  default: `Thank you for your insurance question. I'm currently operating in demo mode with mock API keys.

In a real implementation with valid API keys, I would provide detailed information about European insurance policies, regulations, and claims processes specific to your query and selected country.

For this demo, I can tell you that insurance policies across Europe vary significantly by country, with each nation having its own regulatory framework while also adhering to EU-wide directives. Italy, Germany, France, and other European countries each have unique insurance requirements and market practices.

If you have specific questions about insurance types, EU regulations, country-specific requirements, or claims processes, please feel free to ask, and I'll provide the best information available for the European insurance market in demo mode.`
};

const countrySpecificInfo: Record<string, Record<string, string>> = {
  "Italy": {
    auto: `In Italy, auto insurance is known as "Responsabilità Civile Auto" (RCA) and is mandatory for all vehicles. Here are the key types of coverage available:

1. RCA (Third-Party Liability): Mandatory by law, covers damage to third parties. The minimum coverage required is €6.45 million for personal injuries and €1.3 million for property damage.

2. Kasko: Comprehensive coverage that protects your vehicle regardless of fault, covering collision, theft, fire, and vandalism.

3. Furto e Incendio: Covers theft and fire damage to your vehicle.

4. Cristalli: Specific coverage for windshield and window damage.

5. Assistenza Stradale: Roadside assistance for breakdowns and emergencies.

6. Infortuni del Conducente: Driver injury protection, as RCA only covers passengers and third parties.

7. Tutela Legale: Legal protection for disputes arising from accidents.

Italian auto insurance has some unique features:
- Bonus-Malus system: Premiums increase or decrease based on your claims history
- Direct Compensation procedure (CARD): For accidents with minor injuries
- Black Box (Scatola Nera): Can reduce premiums by 10-20% by monitoring driving habits

The average annual premium in Italy is around €400-600, though rates vary significantly by region, with southern regions like Campania and Sicily having higher premiums than northern regions like Trentino-Alto Adige.`,
    
    health: `Italy's healthcare system operates through the Servizio Sanitario Nazionale (SSN), providing universal coverage to all citizens and legal residents. Private health insurance in Italy serves as a supplement to the public system:

1. Polizza Malattia: Basic health insurance covering hospitalization, surgeries, and specialist visits not covered or with long waiting times in the public system.

2. Polizza Infortuni: Accident insurance providing lump-sum payments for permanent disabilities and daily allowances during recovery periods.

3. Long-Term Care: Covers assistance needs for non-self-sufficient individuals, becoming increasingly important with Italy's aging population.

4. Dental Insurance: Specific coverage for dental care, which is largely not covered by the SSN.

Key features of private health insurance in Italy:
- Direct payment agreements with private clinics and hospitals
- Faster access to specialists and diagnostic tests
- Coverage for high-quality private rooms during hospitalization
- Access to private healthcare facilities with reduced waiting times

Many Italians choose private insurance through their employers or professional associations, which often offer group policies at reduced rates. Premiums typically range from €500-2,000 annually depending on age, coverage level, and any pre-existing conditions.`,

    home: `Home insurance in Italy ("Assicurazione Casa" or "Polizza Abitazione") is not mandatory except for mortgage holders, but is highly recommended due to Italy's exposure to natural disasters:

1. Danni ai Beni (Property Damage): Covers the structure against fire, water damage, and other perils.

2. Responsabilità Civile (Liability Coverage): Protects against claims if someone is injured on your property.

3. Furto e Rapina (Theft Coverage): Covers stolen belongings and damage from break-ins.

4. Catastrofi Naturali (Natural Disasters): Critical in Italy due to earthquake and flood risks, especially in regions like Abruzzo, Umbria, and along the Po Valley.

5. Assistenza Casa (Home Emergency): Provides 24/7 assistance for plumbing, electrical, or locksmith emergencies.

Italian home insurance considerations:
- Earthquake coverage is particularly important in central and southern regions
- Historical buildings may require specialized coverage
- Second homes or vacation properties have different risk profiles
- Condominium policies (Polizza Globale Fabbricati) cover common areas

Premiums vary significantly based on location, property value, and coverage options, typically ranging from €200-600 annually. Many insurers offer discounts for security systems and combined policies.`,

    life: `Life insurance in Italy ("Assicurazione Vita") offers several policy types tailored to the Italian market:

1. Temporanea Caso Morte (Term Life Insurance): Provides coverage for a specific period, with a death benefit paid only if the insured dies during the term.

2. Vita Intera (Whole Life Insurance): Permanent coverage with a guaranteed death benefit and a savings component that accumulates cash value.

3. Polizza Mista (Endowment Policy): Combines life insurance with savings, paying out either upon death or at the end of the policy term.

4. Polizza Unit Linked: Investment-linked policies where premiums are invested in funds chosen by the policyholder, with returns tied to fund performance.

Italian life insurance features:
- Tax advantages: Life insurance benefits are generally exempt from inheritance tax
- Surrender values: Many policies offer cash surrender options after a certain period
- Beneficiary designation: Direct designation bypasses the Italian inheritance process
- Pension integration: Often used to supplement the Italian pension system

The Italian life insurance market has grown significantly in recent years, with premiums typically ranging from €200-1,000 annually depending on age, coverage amount, and policy type.`,

    travel: `Travel insurance in Italy ("Assicurazione Viaggio") is particularly important for Italians traveling both within and outside the European Union:

1. Assistenza Sanitaria (Medical Assistance): Covers emergency medical expenses, hospital stays, and repatriation costs.

2. Annullamento Viaggio (Trip Cancellation): Reimburses non-refundable expenses if you need to cancel your trip for covered reasons.

3. Bagaglio (Baggage Coverage): Protects against lost, stolen, or damaged luggage and personal belongings.

4. Responsabilità Civile (Personal Liability): Covers legal expenses if you accidentally injure someone or damage property during your trip.

Italian travel insurance considerations:
- European Health Insurance Card (EHIC/TEAM): Provides basic coverage within the EU but is not a substitute for comprehensive travel insurance
- Schengen requirements: Non-EU visitors to Italy need insurance with minimum coverage of €30,000
- Winter sports coverage: Essential add-on for skiing in the Italian Alps
- Cruise-specific policies: Special coverage for Mediterranean cruises departing from Italian ports

Many Italians purchase annual multi-trip policies, which typically cost €100-300 depending on coverage levels, destinations, and activities covered.`
  },
  
  "Germany": {
    auto: `In Germany, auto insurance ("Kfz-Versicherung") is strictly regulated and offers three main coverage types:

1. Kfz-Haftpflichtversicherung (Third-Party Liability): Legally mandatory with minimum coverage of €7.5 million for personal injuries and €1.22 million for property damage - higher than most EU countries.

2. Teilkasko (Partial Comprehensive): Covers theft, fire, glass damage, and damage from natural events like storms or hail.

3. Vollkasko (Full Comprehensive): The most complete protection, covering your own vehicle regardless of fault, including collision damage.

German auto insurance features:
- No-claims bonus system (Schadenfreiheitsrabatt): Discounts up to 65% for claim-free years
- Regional classification system (Regionalklassen): Premiums vary by postal code
- Vehicle type classification (Typklassen): Based on repair costs and accident statistics
- Seasonal registration (Saisonkennzeichen): Reduced rates for vehicles used only part of the year

Most Germans switch insurers during the annual "change season" (Wechselsaison) in November, as policies typically run calendar year with a one-month notice period for cancellation.`,

    health: `Germany operates on a dual public-private healthcare system:

1. Gesetzliche Krankenversicherung (GKV): The statutory health insurance system covering about 90% of the population. Mandatory for employees earning below €64,350 annually.

2. Private Krankenversicherung (PKV): Private health insurance available to high-income employees, self-employed individuals, and civil servants. Key features include:
   - Premium calculation based on age, health status, and desired benefits
   - More comprehensive coverage than GKV
   - Access to chief physicians (Chefarztbehandlung)
   - Shorter waiting times for appointments and procedures
   - Single hospital rooms

3. Zusatzversicherung (Supplementary Insurance): Add-on policies for those in the public system, covering:
   - Dental care (Zahnzusatzversicherung)
   - Hospital stays (Krankenhauszusatzversicherung)
   - Outpatient treatments (Ambulante Zusatzversicherung)
   - Alternative medicine (Naturheilverfahren)

German health insurance is known for its comprehensive coverage and high-quality care, with premiums for private insurance typically ranging from €300-1,000 monthly depending on age and coverage level.`,

    home: `Home insurance in Germany ("Wohngebäudeversicherung" and "Hausratversicherung") is divided into two distinct policies:

1. Wohngebäudeversicherung (Building Insurance): Covers the physical structure including:
   - Fire, lightning, explosion damage
   - Storm and hail damage
   - Water pipe damage
   - Optional natural hazard coverage (Elementarschäden) for floods, earthquakes, and landslides

2. Hausratversicherung (Contents Insurance): Protects your belongings against:
   - Theft and burglary
   - Fire and water damage
   - Vandalism
   - Weather-related damage

German home insurance features:
- Replacement value coverage (Neuwertversicherung): Items are insured at replacement cost, not depreciated value
- Underinsurance penalty (Unterversicherung): If you insure for less than actual value, claims may be reduced proportionally
- Bicycle theft coverage (Fahrraddiebstahl): Often available as an add-on
- Glass breakage insurance (Glasbruchversicherung): Separate coverage for windows, doors, and furniture glass

The average annual premium for building insurance ranges from €250-500, while contents insurance typically costs €100-300, depending on location, property value, and coverage options.`,

    liability: `Personal liability insurance ("Privathaftpflichtversicherung") is considered essential in Germany, with over 85% of households having coverage. This insurance protects against claims if you accidentally:

1. Injure someone
2. Damage someone else's property
3. Cause financial loss to others

German liability insurance features:
- High coverage limits: Typically €5-50 million
- Family coverage: Often covers spouse and children
- Key loss coverage: Pays for replacing locks if you lose someone else's keys
- Property damage deductibles: Usually €150-300

Special liability insurance types in Germany include:
- Pet owner liability (Tierhalterhaftpflicht): Mandatory for dog owners in most German states
- Home owner liability (Haus- und Grundbesitzerhaftpflicht): For property owners
- Hunter's liability (Jagdhaftpflicht): Mandatory for licensed hunters
- Professional liability (Berufshaftpflicht): For specific professions

German liability insurance is remarkably affordable, with annual premiums typically ranging from €50-100 for individuals and €70-150 for families, making it one of the most cost-effective insurance types in Germany.`
  },
  
  "France": {
    auto: `In France, auto insurance ("Assurance Automobile") offers several coverage levels:

1. Responsabilité Civile (Third-Party Liability): The minimum legal requirement, covering damage to others but not your own vehicle.

2. Tiers Collision (Third-Party Fire and Theft): Adds coverage for fire and theft of your vehicle.

3. Tous Risques (Comprehensive): Complete coverage including collision damage to your own vehicle regardless of fault.

French auto insurance features:
- Bonus-Malus system: Premiums adjusted by a coefficient between 0.5 and 3.5 based on claims history
- Coefficient de Réduction-Majoration (CRM): Legally regulated system that reduces premiums by 5% each claim-free year
- Young driver surcharges (Surprime Jeune Conducteur): Significant premium increases for drivers with less than 3 years of license
- Constat Amiable: The standardized accident report form used throughout France

French insurers often offer additional options like:
- Bris de Glace: Specific glass coverage
- Garantie du Conducteur: Driver personal injury coverage
- Assistance 0km: Roadside assistance from your home
- Véhicule de Remplacement: Replacement vehicle during repairs

The average annual premium in France is approximately €500-700, with significant variations based on location (Paris being the most expensive) and vehicle type.`,

    health: `The French healthcare system combines universal public coverage with complementary private insurance:

1. Sécurité Sociale: The public health insurance system covering about 70-80% of most healthcare costs for all legal residents.

2. Assurance Complémentaire Santé (Complementary Health Insurance): Private insurance that covers the portion not reimbursed by Sécurité Sociale:
   - Mutuelle: Non-profit health insurance providers
   - Assurance Privée: For-profit private insurers
   - Institution de Prévoyance: Joint employer-employee managed funds

Since 2016, employers must provide complementary health insurance to all employees, covering at least 50% of the premium.

French health insurance features:
- Carte Vitale: Electronic health insurance card for direct billing
- Tiers Payant: Direct payment system where patients don't pay upfront
- Médecin Traitant: Primary care physician who coordinates care
- Parcours de Soins: Care pathway that provides optimal reimbursement rates

Complementary health insurance typically costs €30-100 monthly per person, with premiums based on age, coverage level, and optional benefits like private rooms or alternative medicine.`,

    travel: `Travel insurance in France ("Assurance Voyage") is particularly important for both domestic and international travel:

1. Annulation de Voyage (Trip Cancellation): Reimburses non-refundable expenses if you need to cancel for covered reasons like illness or family emergency.

2. Assistance Médicale (Medical Assistance): Covers emergency medical expenses, hospital stays, and repatriation costs.

3. Bagages (Baggage Coverage): Protects against lost, stolen, or damaged luggage and personal belongings.

4. Responsabilité Civile (Personal Liability): Covers legal expenses if you accidentally injure someone or damage property during your trip.

French travel insurance considerations:
- European Health Insurance Card (EHIC/CEAM): Provides basic coverage within the EU but is not a substitute for comprehensive travel insurance
- Winter sports coverage: Essential add-on for skiing in the French Alps
- Credit card coverage: Many premium French credit cards include basic travel insurance
- Annual multi-trip policies: Popular among frequent travelers, typically costing €100-300

Many French travelers purchase insurance through their travel agencies or tour operators, which often offer packages tailored to specific destinations and activities.`
  },
  
  "Spain": {
    auto: `Auto insurance in Spain ("Seguro de Coche" or "Seguro de Auto") offers several coverage levels:

1. Seguro a Terceros (Third-Party Liability): The minimum legal requirement, covering damage to others but not your own vehicle.

2. Seguro a Terceros Ampliado (Extended Third-Party): Adds coverage for fire, theft, and sometimes glass damage.

3. Seguro a Todo Riesgo (Comprehensive): Complete coverage including collision damage to your own vehicle regardless of fault.

4. Todo Riesgo con Franquicia (Comprehensive with Deductible): Comprehensive coverage with a deductible, offering lower premiums.

Spanish auto insurance features:
- Carta Verde: Green Card for driving in non-EU countries
- Asistencia en Viaje: Roadside assistance, often from kilometer zero (your home)
- Vehículo de Sustitución: Replacement vehicle during repairs
- Defensa Jurídica: Legal defense coverage for traffic violations and accidents

Spanish insurers often offer additional benefits like:
- Cobertura de Lunas: Specific glass coverage
- Robo: Theft protection
- Daños Propios: Coverage for damage to your own vehicle
- Conductor Ocasional: Coverage for occasional drivers

The average annual premium in Spain is approximately €350-600, with significant variations based on driver age, vehicle type, and location (urban areas like Madrid and Barcelona having higher rates).`,

    home: `Home insurance in Spain ("Seguro de Hogar") typically offers two main coverage types:

1. Continente (Building Insurance): Covers the physical structure including walls, roof, floors, fixed installations, and sometimes swimming pools and gardens.

2. Contenido (Contents Insurance): Protects your belongings including furniture, electronics, clothing, and valuables.

Spanish home insurance features:
- Water damage coverage is particularly important due to plumbing issues in older buildings
- Theft coverage often requires security measures like reinforced doors or alarms
- Liability coverage (Responsabilidad Civil) protects against claims from neighbors, important in apartment buildings
- Home assistance (Asistencia Hogar) provides 24/7 emergency services for plumbing, electrical, and locksmith needs

Special considerations for Spanish properties:
- Coastal properties may need specific coverage for salt corrosion
- Holiday homes require specialized policies with unoccupied property coverage
- Community fees in apartment buildings typically include insurance for common areas
- Properties in flood-prone areas like Valencia or Málaga may have higher premiums

The average annual premium ranges from €200-400, with significant variations based on property value, location, and coverage options.`,

    health: `Spain's healthcare system operates through the Sistema Nacional de Salud (SNS), providing universal coverage to all citizens and legal residents. Private health insurance ("Seguro de Salud") serves as a supplement:

1. Seguro Médico Completo: Comprehensive health insurance covering hospitalization, specialists, diagnostic tests, and sometimes dental care.

2. Seguro Dental: Specific dental insurance, often purchased separately or as an add-on.

3. Seguro de Reembolso: Reimbursement policies allowing patients to visit any doctor and claim expenses back.

4. Seguro de Baja Laboral: Income protection insurance for self-employed individuals (autónomos).

Spanish private health insurance features:
- No waiting periods for emergency care
- Direct access to specialists without GP referrals
- Private hospital rooms (habitaciones individuales)
- Shorter waiting times for non-emergency procedures and tests

Many Spanish employers offer private health insurance as an employee benefit, and self-employed individuals can deduct 100% of premiums from their taxable income. Premiums typically range from €30-150 monthly depending on age, coverage level, and any pre-existing conditions.`
  },
  
  "United Kingdom": {
    auto: `Auto insurance in the UK (known as "car insurance" or "motor insurance") is legally required for all vehicles and offers three main coverage levels:

1. Third Party Only: The minimum legal requirement, covering damage to other people's vehicles and property, and injuries to others.

2. Third Party, Fire and Theft: Adds coverage for your vehicle if it's stolen or damaged by fire.

3. Comprehensive: The highest level of protection, covering your vehicle for accidental damage regardless of fault, plus all third-party coverage.

UK car insurance features:
- No-claims bonus: Discounts of up to 75% for claim-free years
- Named driver system: Premiums based on all drivers listed on the policy
- Black box policies (telematics): Lower premiums for safe driving habits
- Voluntary excess: Option to increase excess to reduce premium costs

UK insurers often offer additional benefits like:
- Courtesy car provision during repairs
- Windscreen cover
- Personal belongings coverage
- Legal expenses insurance

The average annual premium in the UK is approximately £470, with significant variations based on driver age, vehicle type, and location (London and Manchester having some of the highest rates).`,

    health: `The UK healthcare system operates through the National Health Service (NHS), providing universal coverage to all residents. Private health insurance (also called "private medical insurance" or PMI) serves as a supplement:

1. Inpatient Only: Covers hospital treatment and overnight stays.

2. Inpatient and Outpatient: Adds coverage for specialist consultations and diagnostic tests without hospital admission.

3. Comprehensive: The most complete coverage, including therapies, mental health treatment, and sometimes limited dental and optical care.

UK private health insurance features:
- Faster access to specialists and treatments
- Choice of consultant and hospital
- Private rooms during hospital stays
- Access to treatments not available on the NHS

Many UK employers offer private health insurance as an employee benefit through group schemes. Individual premiums typically range from £700-1,700 annually depending on age, coverage level, and any pre-existing conditions.

The UK also has a unique system of "cash plans" that reimburse everyday healthcare costs like dental check-ups and eye tests, typically costing £10-30 monthly.`
  },
  
  "Portugal": {
    health: `Portugal's healthcare system operates through the Serviço Nacional de Saúde (SNS), providing universal coverage to all citizens and legal residents. Private health insurance ("Seguro de Saúde") serves as a supplement:

1. Plano Hospitalar: Hospital-only coverage for inpatient treatment and surgeries.

2. Plano Ambulatório: Outpatient coverage for consultations, exams, and treatments without hospitalization.

3. Plano Completo: Comprehensive coverage combining both hospital and outpatient care.

4. Plano Dental: Specific dental insurance, often purchased separately or as an add-on.

Portuguese private health insurance features:
- Network system (sistema de rede) with direct billing to insurers
- Reimbursement option for out-of-network providers
- Annual checkups (check-up anual) included in most plans
- Second medical opinion services for serious conditions

Many Portuguese employers offer private health insurance as an employee benefit, and premiums are tax-deductible up to certain limits. Individual premiums typically range from €20-100 monthly depending on age, coverage level, and any pre-existing conditions.

The Portuguese insurance market also offers unique "health savings" products (poupança-saúde) that combine insurance with a savings component for future healthcare needs.`
  },
  
  "Austria": {
    health: `Austria's healthcare system operates through a social insurance model with mandatory coverage for all residents. Private health insurance ("Private Krankenversicherung") serves as a supplement:

1. Sonderklasse-Versicherung: Hospital class insurance providing access to private rooms and treatment by chief physicians.

2. Ambulante Versicherung: Outpatient insurance covering consultations with private doctors and specialists.

3. Zahnversicherung: Dental insurance covering treatments beyond the basic services provided by public insurance.

Austrian private health insurance features:
- Direct billing with contracted providers (Direktverrechnung)
- Reimbursement for non-contracted providers (Kostenerstattung)
- No waiting periods for accident-related treatments
- Coverage for alternative and complementary medicine (Komplementärmedizin)

The Austrian healthcare system is known for its high quality and accessibility, with public insurance covering about 99% of the population. Private insurance premiums typically range from €100-300 monthly depending on age, coverage level, and any pre-existing conditions.

Notable Austrian insurance providers include Wiener Städtische, UNIQA, and Generali, which offer specialized packages for different demographic groups including expatriates working in Austria.`,

    auto: `Auto insurance in Austria ("Kfz-Versicherung") follows a structured system with three main coverage types:

1. Haftpflichtversicherung (Liability Insurance): Legally mandatory with minimum coverage of €7.6 million for personal injuries and €1.3 million for property damage.

2. Teilkasko (Partial Comprehensive): Covers specific risks including theft, fire, natural disasters, and collisions with animals.

3. Vollkasko (Full Comprehensive): The most complete coverage, protecting against all damage to your vehicle regardless of fault.

Austrian auto insurance features:
- Bonus-Malus system: Premiums adjusted based on claims history, with discounts up to 70% for claim-free years
- Wechselkennzeichen: Special registration allowing alternating use of two vehicles with one license plate, reducing insurance costs
- Winter tire requirement: Insurance may not fully cover accidents during winter months (November-April) if appropriate tires aren't used
- Electronic insurance verification system linked to vehicle registration

The average annual premium in Austria ranges from €300-700 for liability insurance and €600-1,200 for comprehensive coverage, depending on vehicle type, driver age, and location (Vienna typically having higher rates than rural areas).

Major Austrian auto insurers include UNIQA, Generali, and Allianz, with many offering discounts for safety features, garage parking, and combined policies.`
  },
  
  "Netherlands": {
    health: `The Netherlands operates a mandatory health insurance system ("Zorgverzekering") where all residents must purchase basic health insurance from private insurers, with the government regulating coverage and pricing:

1. Basisverzekering: Mandatory basic insurance covering essential medical care including GP visits, hospital treatment, and prescription medications.

2. Aanvullende Verzekering: Supplementary insurance covering services not included in the basic package, such as dental care, physiotherapy, and alternative medicine.

3. Tandartsverzekering: Specific dental insurance packages with varying levels of coverage.

Dutch health insurance features:
- Annual deductible (eigen risico) of €385 (as of 2025) for services beyond GP care
- Free choice of insurer with standardized basic coverage
- Community rating system prohibiting premium differentiation based on health status
- Healthcare allowance (zorgtoeslag) available for lower-income residents

The Dutch system is unique in combining mandatory private insurance with strong government regulation. Basic insurance premiums typically range from €120-150 monthly, with supplementary packages adding €10-50 depending on coverage level.

Major Dutch health insurers include CZ, VGZ, Zilveren Kruis, and Menzis, with many offering group discounts through employers or associations.`,

    auto: `Auto insurance in the Netherlands ("Autoverzekering") follows a structured system with three main coverage types:

1. WA (Wettelijke Aansprakelijkheid): Legally mandatory liability insurance covering damage to third parties with minimum coverage of €1.3 million for property damage and €6.1 million for personal injuries.

2. WA + Beperkt Casco: Adds limited coverage for your own vehicle including fire, theft, storm damage, and glass breakage.

3. WA + Volledig Casco (All Risk): The most comprehensive coverage, protecting your vehicle against all damage regardless of fault.

Dutch auto insurance features:
- No-claim discount (no-claimkorting): Discounts up to 80% for claim-free years
- Second car discount (tweede autoverzekering korting): Reduced rates for insuring multiple vehicles
- Young driver surcharge (jonge bestuurder toeslag): Higher premiums for drivers under 25
- Kilometer limitation policies offering discounts for low annual mileage

The average annual premium in the Netherlands ranges from €300-600 for WA insurance and €700-1,400 for all-risk coverage, depending on vehicle type, driver age, and location (Amsterdam and Rotterdam typically having higher rates).

Major Dutch auto insurers include Centraal Beheer, ANWB, and Nationale-Nederlanden, with many offering discounts for security features and combined policies.`
  },
  
  "Belgium": {
    health: `Belgium's healthcare system operates through a compulsory health insurance system managed by mutual insurance associations ("mutualités"/"ziekenfonds"). Private supplementary health insurance ("Assurance Hospitalisation"/"Hospitalisatieverzekering") serves as an important complement:

1. Assurance Hospitalisation: Hospital insurance covering private room costs, co-payments, and extras not covered by the basic system.

2. Assurance Ambulatoire: Outpatient insurance covering consultations, medications, and treatments without hospitalization.

3. Assurance Dentaire: Dental insurance covering treatments beyond the basic services provided by the mandatory system.

Belgian health insurance features:
- Third-party payment system (tiers payant) where patients only pay their portion of costs
- Maximum billing system (maximum à facturer) capping annual healthcare expenses based on income
- Preferential reimbursement for vulnerable groups
- Cross-border coverage for treatment in neighboring countries

The Belgian system provides universal coverage through a combination of social security contributions and taxation. Supplementary insurance premiums typically range from €100-300 annually for basic hospital coverage and €300-600 for comprehensive packages.

Major Belgian health insurers include DKV, AG Insurance, and the mutualités themselves (Christelijke Mutualiteit, Socialistische Mutualiteit, etc.), which offer both mandatory and supplementary coverage.`,

    auto: `Auto insurance in Belgium ("Assurance Auto"/"Autoverzekering") follows a structured system with several coverage options:

1. Responsabilité Civile/Burgerlijke Aansprakelijkheid (Civil Liability): Legally mandatory insurance covering damage to third parties with minimum coverage of €1.3 million for property damage and unlimited coverage for personal injuries.

2. Omnium Partielle/Gedeeltelijke Omnium (Partial Comprehensive): Covers specific risks including fire, theft, glass breakage, and natural disasters.

3. Omnium Complète/Volledige Omnium (Full Comprehensive): The most complete coverage, protecting against all damage to your vehicle regardless of fault.

Belgian auto insurance features:
- Bonus-Malus system: Premiums adjusted based on claims history, with discounts for claim-free years
- Joker system: Some insurers offer "jokers" allowing one claim without affecting your bonus-malus rating
- Young driver policies with telematics options to reduce high premiums
- Legal protection (protection juridique/rechtsbijstand) often included or available as an add-on

The average annual premium in Belgium ranges from €400-700 for liability insurance and €800-1,500 for comprehensive coverage, depending on vehicle type, driver age, and location (Brussels typically having higher rates than rural areas).

Major Belgian auto insurers include AG Insurance, AXA, and Ethias, with many offering multi-policy discounts when combined with home insurance.`
  },
  
  "Switzerland": {
    health: `Switzerland operates a mandatory private health insurance system ("Krankenversicherung"/"Assurance Maladie") where all residents must purchase basic health insurance from private insurers within three months of arrival:

1. Grundversicherung/Assurance de Base: Mandatory basic insurance covering essential medical care including GP visits, hospital treatment, and prescription medications.

2. Zusatzversicherung/Assurance Complémentaire: Supplementary insurance covering services not included in the basic package, such as private hospital rooms, dental care, and alternative medicine.

3. Zahnversicherung/Assurance Dentaire: Specific dental insurance as dental care is not covered by the basic insurance.

Swiss health insurance features:
- Annual deductible (Franchise/Selbstbehalt) options ranging from CHF 300-2,500
- Co-payment of 10% up to an annual cap of CHF 700
- Free choice of doctor and hospital within your canton
- Premium reduction subsidies available for lower-income residents

The Swiss system is unique in being entirely private but heavily regulated. Basic insurance premiums typically range from CHF 300-600 monthly depending on age, canton, and chosen deductible, with supplementary packages adding CHF 50-200.

Major Swiss health insurers include CSS, Helsana, Swica, and Groupe Mutuel, with significant premium variations between cantons (Geneva and Basel typically having higher rates than rural cantons).`,

    auto: `Auto insurance in Switzerland ("Motorfahrzeugversicherung"/"Assurance Automobile") follows a comprehensive system with three main coverage types:

1. Haftpflichtversicherung/Responsabilité Civile (Liability Insurance): Legally mandatory with minimum coverage of CHF 5 million for both personal injuries and property damage combined.

2. Teilkasko/Casco Partielle (Partial Comprehensive): Covers specific risks including theft, fire, natural disasters, glass breakage, and collisions with animals.

3. Vollkasko/Casco Complète (Full Comprehensive): The most complete coverage, protecting against all damage to your vehicle regardless of fault.

Swiss auto insurance features:
- Bonus-Malus system: Premiums adjusted based on claims history, with discounts up to 70% for claim-free years
- Parking damage coverage (Parkschaden) as a specific option
- Cross-border coverage for driving in EU countries
- Gross negligence protection (Grobfahrlässigkeitsschutz) covering accidents caused by serious driver errors

The average annual premium in Switzerland ranges from CHF 500-900 for liability insurance and CHF 1,000-2,000 for comprehensive coverage, depending on vehicle type, driver age, and canton (Zurich and Geneva typically having higher rates).

Major Swiss auto insurers include Zurich, AXA, Allianz, and Die Mobiliar, with many offering discounts for safety features, garage parking, and combined policies.`
  },
  
  "Greece": {
    health: `Greece's healthcare system operates through the National Organization for Healthcare Provision (EOPYY), providing universal coverage to all citizens and legal residents. Private health insurance ("Ασφάλεια Υγείας") serves as an important supplement:

1. Νοσοκομειακή Κάλυψη (Hospital Coverage): Covers inpatient treatment, surgeries, and hospital stays.

2. Εξωνοσοκομειακή Κάλυψη (Outpatient Coverage): Covers doctor visits, diagnostic tests, and treatments without hospitalization.

3. Οδοντιατρική Κάλυψη (Dental Coverage): Specific dental insurance, often purchased separately or as an add-on.

Greek private health insurance features:
- Direct billing with contracted hospitals and clinics
- Annual preventive check-up packages
- Second medical opinion services for serious conditions
- Medical evacuation coverage for residents of islands and remote areas

The Greek public healthcare system has faced challenges following the economic crisis, leading to increased demand for private insurance. Premiums typically range from €50-200 monthly depending on age, coverage level, and any pre-existing conditions.

Major Greek health insurers include Ethniki Asfalistiki, Interamerican, and Eurolife ERB, with many offering specialized packages for different demographic groups including families and seniors.`,

    auto: `Auto insurance in Greece ("Ασφάλεια Αυτοκινήτου") follows a structured system with several coverage options:

1. Αστική Ευθύνη (Civil Liability): Legally mandatory insurance covering damage to third parties with minimum coverage of €1.22 million for personal injuries and €1.22 million for property damage.

2. Μερική Κάλυψη (Partial Coverage): Adds protection for specific risks including fire, theft, natural disasters, and glass breakage.

3. Πλήρης Κάλυψη (Full Coverage): The most comprehensive option, protecting against all damage to your vehicle regardless of fault.

Greek auto insurance features:
- Bonus-Malus system: Premiums adjusted based on claims history
- Seasonal discounts for vehicles with limited use (common for island residents)
- Higher premiums for vehicles registered in high-risk areas (Athens and Thessaloniki)
- Legal protection (Νομική Προστασία) available as an important add-on

The average annual premium in Greece ranges from €200-400 for basic liability insurance and €500-900 for comprehensive coverage, depending on vehicle type, driver age, and location.

Major Greek auto insurers include Interamerican, Ethniki Asfalistiki, and Anytime, with many offering discounts for security features and combined policies.`
  }
};

function getMockResponse(message: string, country: string): string {
  const lowerMessage = message.toLowerCase();
  let responseType = 'default';
  
  if (lowerMessage.includes('auto') || lowerMessage.includes('car')) {
    responseType = 'auto';
  } else if (lowerMessage.includes('health') || lowerMessage.includes('medical')) {
    responseType = 'health';
  } else if (lowerMessage.includes('home') || lowerMessage.includes('house') || lowerMessage.includes('property') || lowerMessage.includes('homeowners')) {
    responseType = 'home';
  } else if (lowerMessage.includes('life') || lowerMessage.includes('death') || lowerMessage.includes('beneficiary')) {
    responseType = 'life';
  } else if (lowerMessage.includes('travel') || lowerMessage.includes('trip') || lowerMessage.includes('vacation') || lowerMessage.includes('international')) {
    responseType = 'travel';
  } else if (lowerMessage.includes('business') || lowerMessage.includes('company') || lowerMessage.includes('commercial')) {
    responseType = 'business';
  } else if (lowerMessage.includes('liability') || lowerMessage.includes('lawsuit') || lowerMessage.includes('legal')) {
    responseType = 'liability';
  } else if (lowerMessage.includes('pet') || lowerMessage.includes('dog') || lowerMessage.includes('cat') || lowerMessage.includes('animal')) {
    responseType = 'pet';
  }
  
  if (countrySpecificInfo[country] && countrySpecificInfo[country][responseType]) {
    return countrySpecificInfo[country][responseType];
  }
  
  return mockResponses[responseType];
}

export async function POST(req: NextRequest) {
  try {
    const { message, country, language, history } = await req.json()

    // Validate country
    const actualCountry = country || "United States"
    
    const groqApiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
    const isMockKey = !groqApiKey || groqApiKey === 'mock_groq_api_key';
    
    let processedResponse = '';
    
    if (isMockKey) {
      processedResponse = getMockResponse(message, actualCountry);
    } else {
      // Create a very explicit system message to ensure proper formatting
      const systemMessage = `You are an insurance expert providing information about insurance policies, claims, and regulations based on the laws in ${actualCountry}.

IMPORTANT FORMATTING INSTRUCTIONS:
1. Respond in ${language}.
2. Provide ONLY the direct answer to the user's question.
3. Format your response with clear paragraphs, bullet points, or numbered lists when appropriate.
4. NEVER include phrases like "As an AI assistant" or "I'm an AI" or any self-references.
5. NEVER include any thinking process, reasoning, or meta-commentary.
6. NEVER use <Thinking> tags or similar constructs.
7. Keep responses concise, professional, and factual.
8. Do not apologize or use unnecessary pleasantries.
9. Focus on providing accurate insurance information only.

The user will not see these instructions, only your direct response.`

      // Format messages for the AI SDK
      const formattedMessages = [
        { role: "system", content: systemMessage },
        ...history,
        { role: "user", content: message },
      ]

      // Use the Groq integration with AI SDK
      const result = await generateText({
        model: groq("deepseek-r1-distill-llama-70b"),
        messages: formattedMessages,
        temperature: 0.2, // Lower temperature for more focused responses
        maxTokens: 1000,
      })

      // Process the response to ensure it's properly formatted
      processedResponse = result.text

      // Remove any thinking process markers if they somehow appear
      processedResponse = processedResponse.replace(/<Thinking>[\s\S]*?<\/Thinking>/g, "")

      // Remove any markdown code block markers that might appear
      processedResponse = processedResponse.replace(/```[\s\S]*?```/g, "")

      // Remove any AI assistant self-references with more aggressive patterns
      const selfReferencePatterns = [
        /^(As an AI assistant|As an AI|As a language model|As an insurance expert,|I'm an AI|I am an AI|As a virtual assistant)/i,
        /I don't have personal opinions/i,
        /I don't have access to/i,
        /I cannot provide/i,
        /I'm here to help/i,
        /I'd be happy to/i,
        /I hope this helps/i,
        /Let me know if you have any other questions/i,
      ]

      for (const pattern of selfReferencePatterns) {
        processedResponse = processedResponse.replace(pattern, "")
      }

      // Clean up any extra whitespace and ensure proper formatting
      processedResponse = processedResponse.trim()

      // Ensure the response doesn't start with unnecessary punctuation after removing prefixes
      processedResponse = processedResponse.replace(/^[,.:;]\s*/, "")

      // Capitalize the first letter if it's not already
      if (processedResponse.length > 0) {
        processedResponse = processedResponse.charAt(0).toUpperCase() + processedResponse.slice(1)
      }
    }

    return NextResponse.json({
      content: processedResponse,
      role: "assistant",
    })
  } catch (error) {
    console.error("Error in chat API:", error)
    
    const mockResponse = mockResponses.default;
    
    return NextResponse.json({
      content: mockResponse,
      role: "assistant",
    })
  }
}
