// Comprehensive High-Traffic Niches & Services Dataset for Programmatic SEO across India
// Niches: Home Services, Coaching & Education, Professional (Legal/Tax), Wellness & Lifestyle

export const NICHES = [
  {
    id: "home-services",
    slug: "home-services",
    name: "Home Services & Utilities",
    shortName: "Home Services",
    iconName: "Wrench",
    color: "#ea580c", // Vibrant orange
    bgColor: "rgba(234, 88, 12, 0.12)",
    trafficDensity: "Massive (🔴 Tier 1)",
    trafficBadge: "🔴 Massive Traffic",
    competitionLevel: "Medium",
    monetizationStrategy: "Pay-per-lead / Cost-per-call",
    monetizationType: "lead-call",
    ctaPrimary: "Call Verified Pro Now",
    ctaSecondary: "Get Instant Free Quote",
    leadPriceEstimate: "₹250 - ₹650 per verified lead",
    description: "On-demand verified electricians, plumbers, AC technicians, cleaning experts, and utility specialists with transparent rate cards across 30+ Indian cities.",
    services: [
      {
        slug: "ac-repair-service",
        name: "AC Repair & Gas Refill",
        shortName: "AC Repair",
        searchIntent: "ac repair in {city}, split ac gas refill charges, ac installation near me",
        basePriceRange: "₹499 - ₹2,499",
        avgResponseTime: "30 Mins",
        satisfactionRate: "98.6%",
        reviewsCount: 342,
        rateCard: [
          { service: "Split / Window AC Foam Deep Cleaning", price: "₹499", duration: "45 mins", warranty: "30-Day Guarantee" },
          { service: "R32 / R410A Refrigerant Gas Top-Up & Leak Check", price: "₹1,850", duration: "60 mins", warranty: "60-Day Guarantee" },
          { service: "Complete AC Uninstallation & Re-installation", price: "₹1,299", duration: "90 mins", warranty: "Tested & Certified" },
          { service: "Compressor / Inverter PCB Circuit Diagnostics", price: "₹349", duration: "30 mins", warranty: "Standard Diagnosis" }
        ],
        faqs: [
          { q: "How much does AC gas refill cost in {city}?", a: "Standard AC gas refill in {city} typically costs between ₹1,650 to ₹2,500 depending on the refrigerant type (R32, R410A, or R22) and the tonnage of your AC unit." },
          { q: "How quickly can a verified AC technician reach my address in {city}?", a: "Technicians in {city} are dispatched from localized hub areas and typically arrive within 30 to 45 minutes of booking confirmation." },
          { q: "Do technician visits include a post-service warranty in {city}?", a: "Yes, all verified repair jobs carried out in {city} come with an automatic 30-day post-service warranty covering workmanship and spare parts." }
        ]
      },
      {
        slug: "electrician-services",
        name: "Certified Electrician Services",
        shortName: "Electricians",
        searchIntent: "electrician near me in {city}, home wiring repair, switchboard replacement {city}",
        basePriceRange: "₹199 - ₹1,499",
        avgResponseTime: "25 Mins",
        satisfactionRate: "97.9%",
        reviewsCount: 418,
        rateCard: [
          { service: "Inspection & Problem Diagnostics", price: "₹199", duration: "30 mins", warranty: "Waived if service taken" },
          { service: "Modular Switchboard / MCB Tripper Replacement", price: "₹299", duration: "40 mins", warranty: "30-Day Guarantee" },
          { service: "Ceiling Fan / Chandelier Installation", price: "₹249", duration: "30 mins", warranty: "Fitted & Balanced" },
          { service: "Complete Inverter & Tubular Battery Wiring", price: "₹899", duration: "90 mins", warranty: "6-Month Wiring Warranty" }
        ],
        faqs: [
          { q: "What is the minimum visiting fee for an electrician in {city}?", a: "The standard inspection fee in {city} is ₹199, which is usually waived or adjusted against the final service bill if you proceed with repairs." },
          { q: "Are electricians in {city} licensed and police-verified?", a: "Yes, every partner electrician listed on UrbanSarkari in {city} holds government wireman certification and has undergone identity and background verification." }
        ]
      },
      {
        slug: "plumber-services",
        name: "Emergency Plumbing & Leak Fix",
        shortName: "Plumbing",
        searchIntent: "plumber in {city}, bathroom pipe leak repair, water tank cleaning {city}",
        basePriceRange: "₹249 - ₹1,899",
        avgResponseTime: "30 Mins",
        satisfactionRate: "98.2%",
        reviewsCount: 295,
        rateCard: [
          { service: "Tap, Jet Spray & Angle Valve Replacement", price: "₹249", duration: "30 mins", warranty: "No Leak Guarantee" },
          { service: "Washbasin & Sink Drain Blockage Clearance", price: "₹399", duration: "45 mins", warranty: "Free Flow Checked" },
          { service: "Concealed Wall Pipe Leakage Detection", price: "₹799", duration: "60 mins", warranty: "Accurate Acoustic Scan" },
          { service: "1000L Overhead Water Tank Mechanized Clean", price: "₹899", duration: "75 mins", warranty: "UV Sanitized" }
        ],
        faqs: [
          { q: "Can I get an emergency plumber at night or on weekends in {city}?", a: "Yes, emergency plumbing teams are on standby across {city} with a typical arrival time of under 45 minutes for burst pipes and acute blockages." }
        ]
      },
      {
        slug: "pest-control",
        name: "Pest Control & Termite Treatment",
        shortName: "Pest Control",
        searchIntent: "pest control in {city}, cockroach control near me, anti-termite treatment {city}",
        basePriceRange: "₹899 - ₹4,499",
        avgResponseTime: "Same Day",
        satisfactionRate: "99.1%",
        reviewsCount: 512,
        rateCard: [
          { service: "1 BHK / 2 BHK Odorless Cockroach Gel Treatment", price: "₹899", duration: "45 mins", warranty: "90-Day Free Retreatment" },
          { service: "Bed Bug Eradication (2 Stage Spray)", price: "₹1,499", duration: "60 mins", warranty: "Complete Eradication" },
          { service: "Pre / Post-Construction Termite Drilling & Piping", price: "₹3,499", duration: "3-4 Hours", warranty: "5-Year Guarantee" },
          { service: "Commercial Restaurant / Office Sanitization", price: "₹2,199", duration: "2 Hours", warranty: "FSSAI Compliant" }
        ],
        faqs: [
          { q: "Is the chemical spray safe for children and pets in {city} homes?", a: "Yes, technicians in {city} use government-approved Bayer odorless herbal gel and eco-friendly chemicals that require zero kitchen evacuation." }
        ]
      },
      {
        slug: "ro-water-purifier-service",
        name: "RO Purifier Service & Filter Replacement",
        shortName: "RO Service",
        searchIntent: "ro water purifier service in {city}, kent ro repair, aquaguard filter replacement",
        basePriceRange: "₹399 - ₹2,199",
        avgResponseTime: "45 Mins",
        satisfactionRate: "98.4%",
        reviewsCount: 380,
        rateCard: [
          { service: "Comprehensive RO Health Check & TDS Tuning", price: "₹399", duration: "30 mins", warranty: "TDS Tested" },
          { service: "Sediment & Carbon Pre-Filter Replacement", price: "₹799", duration: "40 mins", warranty: "100% Genuine Media" },
          { service: "75/80 GPD RO Membrane Replacement", price: "₹1,450", duration: "45 mins", warranty: "1-Year Life Rating" },
          { service: "Booster Pump (100 GPD) Replacement", price: "₹1,850", duration: "60 mins", warranty: "1-Year Replacement Warranty" }
        ],
        faqs: [
          { q: "What should be the ideal drinking water TDS in {city}?", a: "For municipal water supplies in {city}, a TDS range between 80 to 150 mg/L is recommended for healthy mineral retention and taste." }
        ]
      },
      {
        slug: "deep-cleaning-services",
        name: "Full Home Deep Cleaning & Sanitization",
        shortName: "Home Cleaning",
        searchIntent: "house cleaning services in {city}, bathroom deep clean, kitchen degreasing {city}",
        basePriceRange: "₹1,499 - ₹6,499",
        avgResponseTime: "Scheduled Slot",
        satisfactionRate: "98.0%",
        reviewsCount: 467,
        rateCard: [
          { service: "Intense Bathroom Descaling & Tile Scrubbing", price: "₹599/bath", duration: "60 mins", warranty: "Hard Water Stain Removal" },
          { service: "Modular Kitchen Degreasing & Chimney Clean", price: "₹1,299", duration: "90 mins", warranty: "Food-Safe Sanitizer" },
          { service: "Complete 2 BHK Apartment Deep Cleaning", price: "₹3,499", duration: "4-5 Hours", warranty: "Single-Day Handover" },
          { service: "5-Seater Sofa & Mattress Shampoo Extraction", price: "₹999", duration: "60 mins", warranty: "Industrial Vacuum Clean" }
        ],
        faqs: [
          { q: "Do cleaning teams in {city} bring their own machines and chemicals?", a: "Yes, certified cleaning crews arrive with industrial single-disc scrubbing machines, wet/dry vacuums, and microfiber supplies." }
        ]
      }
    ]
  },
  {
    id: "coaching-institutes",
    slug: "coaching-institutes",
    name: "Coaching & Education Academies",
    shortName: "Coaching & Education",
    iconName: "GraduationCap",
    color: "#2563eb", // Royal blue
    bgColor: "rgba(37, 99, 235, 0.12)",
    trafficDensity: "High (Seasonal) (🔴 Tier 1)",
    trafficBadge: "🔴 High Seasonal Traffic",
    competitionLevel: "High",
    monetizationStrategy: "Institute Student Acquisition",
    monetizationType: "student-acquisition",
    ctaPrimary: "Book 1-on-1 Trial Class",
    ctaSecondary: "Download Fee Structure PDF",
    leadPriceEstimate: "₹1,200 - ₹3,500 per enrolled student enquiry",
    description: "Compare premier civil service academies, NEET repeaters centers, IIT-JEE institutes, and Banking entrance classrooms with verified batch schedules and fee structures.",
    services: [
      {
        slug: "upsc-ias-coaching",
        name: "UPSC Civil Services (IAS / IPS) Academy",
        shortName: "UPSC Coaching",
        searchIntent: "best upsc coaching in {city}, ias academy fees {city}, civil services prelims test series",
        basePriceRange: "₹65,000 - ₹1,85,000",
        avgResponseTime: "Counselor Call in 10 Mins",
        satisfactionRate: "97.4%",
        reviewsCount: 684,
        rateCard: [
          { service: "1-Year GS Foundation Batch (Prelims + Mains + CSAT)", price: "₹1,20,000", duration: "12 Months", warranty: "Daily Answer Writing" },
          { service: "Optional Subject Classroom Module (PSIR/Public Admin/Hist)", price: "₹45,000", duration: "5 Months", warranty: "Top Faculty Notes" },
          { service: "CSAT Paper-II Speed & Accuracy Module", price: "₹16,500", duration: "2.5 Months", warranty: "100% Qualifying Guarantee" },
          { service: "All India Prelims Test Series (35 Full Mocks + Mentorship)", price: "₹12,500", duration: "Flexible", warranty: "AI All-India Rank Predictor" }
        ],
        faqs: [
          { q: "What is the average fee for UPSC classroom coaching in {city}?", a: "Reputed civil services academies in {city} typically charge between ₹95,000 to ₹1,60,000 for a comprehensive 1-year General Studies Prelims-cum-Mains batch." },
          { q: "Can working professionals in {city} enroll in weekend UPSC batches?", a: "Yes, most premier institutes in {city} offer dedicated Saturday-Sunday batches and hybrid live-streaming access for working aspirants." }
        ]
      },
      {
        slug: "neet-medical-coaching",
        name: "NEET UG Medical Entrance Coaching",
        shortName: "NEET Medical",
        searchIntent: "neet coaching in {city}, neet repeaters batch fees, medical entrance institute {city}",
        basePriceRange: "₹75,000 - ₹1,95,000",
        avgResponseTime: "Instant Counseling",
        satisfactionRate: "98.1%",
        reviewsCount: 820,
        rateCard: [
          { service: "Class 11 & 12 Two-Year Integrated Medical Batch", price: "₹1,75,000", duration: "24 Months", warranty: "Physics/Chem/Bio Lab Access" },
          { service: "1-Year Droppers / Repeaters Target Batch", price: "₹95,000", duration: "10 Months", warranty: "Rigorous Daily Test System" },
          { service: "NCERT Biology Line-by-Line Mastery Course", price: "₹18,000", duration: "4 Months", warranty: "360/360 Target Material" },
          { service: "OMR-Based National Mock Test Series", price: "₹9,500", duration: "25 Tests", warranty: "Detailed Video Solutions" }
        ],
        faqs: [
          { q: "Do institutes in {city} provide hostel facilities for outstation NEET students?", a: "Yes, verified partner academies in {city} operate secure, CCTV-monitored hostels with healthy food and dedicated study hours." }
        ]
      },
      {
        slug: "jee-mains-advanced-coaching",
        name: "IIT-JEE Mains & Advanced Prep Academy",
        shortName: "IIT-JEE Prep",
        searchIntent: "iit jee coaching in {city}, best jee mains academy, jee advanced coaching {city}",
        basePriceRange: "₹85,000 - ₹2,10,000",
        avgResponseTime: "Counselor Call",
        satisfactionRate: "97.8%",
        reviewsCount: 710,
        rateCard: [
          { service: "2-Year Classroom Program (Class 11 & 12)", price: "₹1,85,000", duration: "2 Years", warranty: "IITian Faculty Mentors" },
          { service: "1-Year Repeater Batch for JEE Advanced", price: "₹1,05,000", duration: "1 Year", warranty: "Advanced Problem Sets" },
          { service: "Crash Course for JEE Mains Session 1 & 2", price: "₹24,999", duration: "90 Days", warranty: "Rapid Revision Modules" }
        ],
        faqs: [
          { q: "How many hours of daily classes are conducted in {city}?", a: "Standard batches have 4 to 5 hours of classroom lectures followed by 2 hours of supervised doubt-clearing sessions." }
        ]
      },
      {
        slug: "banking-ssc-exams-coaching",
        name: "Bank PO, Clerk & SSC CGL Academy",
        shortName: "Bank / SSC Exams",
        searchIntent: "bank exam coaching in {city}, ssc cgl coaching, ibps po coaching center {city}",
        basePriceRange: "₹12,000 - ₹35,000",
        avgResponseTime: "5 Mins",
        satisfactionRate: "98.7%",
        reviewsCount: 940,
        rateCard: [
          { service: "Complete Bank Exam Package (IBPS / SBI PO & Clerk)", price: "₹16,500", duration: "6 Months", warranty: "Unlimited Computer Lab Access" },
          { service: "SSC CGL / CHSL Comprehensive Tier 1 + 2 Batch", price: "₹18,500", duration: "6 Months", warranty: "Speed Maths & GK Capsules" },
          { service: "Speed Test Lab Membership & Interview Boot Camp", price: "₹4,999", duration: "3 Months", warranty: "Mock Interviews by Ex-Bankers" }
        ],
        faqs: [
          { q: "Is the course available in bilingual medium in {city}?", a: "Yes, classes in {city} are delivered in English along with Hindi / the local state language to ensure complete conceptual clarity." }
        ]
      },
      {
        slug: "ielts-study-abroad-training",
        name: "IELTS, TOEFL & Study Abroad Consultancy",
        shortName: "IELTS / Abroad",
        searchIntent: "ielts coaching in {city}, study abroad consultant, ielts band 8 classes {city}",
        basePriceRange: "₹9,999 - ₹45,000",
        avgResponseTime: "15 Mins",
        satisfactionRate: "99.0%",
        reviewsCount: 520,
        rateCard: [
          { service: "IELTS Academic Band 8+ Masterclass (1-on-1 Speaking)", price: "₹12,999", duration: "60 Days", warranty: "Band 7.5+ Score Guarantee" },
          { service: "PTE Academic & Duolingo English Express Prep", price: "₹9,999", duration: "30 Days", warranty: "AI Software Scored Tests" },
          { service: "Complete University Shortlisting & Visa Application", price: "₹24,999", duration: "Till Visa", warranty: "SOP & LOR Assistance" }
        ],
        faqs: [
          { q: "How many mock tests are included in the IELTS package in {city}?", a: "Courses in {city} include 20 full-length British Council/IDP format computer-delivered mock tests with individualized speaking evaluation." }
        ]
      }
    ]
  },
  {
    id: "legal-tax-services",
    slug: "legal-tax-services",
    name: "Professional (Legal, Tax & CA Retainers)",
    shortName: "Legal & Tax Services",
    iconName: "Briefcase",
    color: "#7c3aed", // Rich purple
    bgColor: "rgba(124, 58, 237, 0.12)",
    trafficDensity: "Moderate (🟡 Tier 2)",
    trafficBadge: "🟡 High-Value Leads",
    competitionLevel: "Very High",
    monetizationStrategy: "Premium retainers / High-tier leads",
    monetizationType: "retainer-lead",
    ctaPrimary: "Consult Verified Lawyer / CA",
    ctaSecondary: "Get Retainer Package Quote",
    leadPriceEstimate: "₹800 - ₹2,800 per legal/tax consultation",
    description: "Certified Chartered Accountants, High Court Advocates, GST consultants, and trademark attorneys providing transparent fixed-fee legal advisory.",
    services: [
      {
        slug: "gst-registration-filing",
        name: "GST Registration & Monthly Return Filing",
        shortName: "GST Services",
        searchIntent: "gst registration in {city}, ca for gst filing near me, gst notice reply {city}",
        basePriceRange: "₹1,499 - ₹8,999",
        avgResponseTime: "15 Mins",
        satisfactionRate: "99.4%",
        reviewsCount: 560,
        rateCard: [
          { service: "New GST Registration & ARN Certificate Issuance", price: "₹1,499", duration: "3-5 Working Days", warranty: "100% Approval Guarantee" },
          { service: "Monthly GSTR-1 & GSTR-3B Return Filing (Up to 100 Invoices)", price: "₹999/mo", duration: "Monthly Retainer", warranty: "Zero Penalty Guarantee" },
          { service: "GST Department Notice Scrutiny & Legal Reply", price: "₹3,999", duration: "Case Basis", warranty: "Drafted by Senior CA" },
          { service: "GSTR-9 Annual Return & Balance Sheet Reconciliation", price: "₹4,999", duration: "7 Days", warranty: "Audit-Proof Documentation" }
        ],
        faqs: [
          { q: "What documents are required for GST registration in {city}?", a: "You need PAN card, Aadhaar, electricity bill or rental agreement of the business premises in {city}, bank statement/cancelled cheque, and authorization letter." },
          { q: "Is monthly GST return filing mandatory even if there are zero sales?", a: "Yes, filing a Nil GSTR-1 and GSTR-3B return is legally required every month to avoid cumulative late fees and suspension of your GSTIN." }
        ]
      },
      {
        slug: "property-lawyer-documentation",
        name: "Property Legal Verification & Title Check",
        shortName: "Property Lawyer",
        searchIntent: "property lawyer in {city}, title deed verification advocate, flat registration legal opinion",
        basePriceRange: "₹3,999 - ₹18,000",
        avgResponseTime: "20 Mins",
        satisfactionRate: "98.9%",
        reviewsCount: 390,
        rateCard: [
          { service: "30-Year Encumbrance Certificate (EC) & Title Verification", price: "₹4,999", duration: "3 Days", warranty: "Signed Advocate Legal Opinion" },
          { service: "Sale Deed Drafting, Stamping & SRO Registration Attendance", price: "₹7,500", duration: "1 Day", warranty: "Flawless Execution" },
          { service: "Inheritance, Partition & Gift Deed Drafting", price: "₹6,000", duration: "2-3 Days", warranty: "High Court Bar Advocate" }
        ],
        faqs: [
          { q: "Why is a title search legal opinion essential before buying land in {city}?", a: "An independent legal opinion confirms whether the seller has unencumbered ownership rights, verifies master plan layout approvals, and prevents buying disputed or mortgaged land." }
        ]
      },
      {
        slug: "chartered-accountant-audit",
        name: "Chartered Accountant (CA) Tax & Audit",
        shortName: "CA & Income Tax",
        searchIntent: "chartered accountant in {city}, itr filing for business, tax audit 44ab {city}",
        basePriceRange: "₹1,999 - ₹25,000",
        avgResponseTime: "15 Mins",
        satisfactionRate: "99.2%",
        reviewsCount: 640,
        rateCard: [
          { service: "Salaried & Capital Gains ITR-2 Filing", price: "₹1,999", duration: "24 Hours", warranty: "Maximized Legal Tax Refund" },
          { service: "Business & Presumptive Tax ITR-3 / ITR-4 Filing", price: "₹3,999", duration: "48 Hours", warranty: "Complete Books Verification" },
          { service: "Section 44AB Tax Audit & Balance Sheet Certification", price: "₹14,999", duration: "7 Days", warranty: "UDIN Verified by Practicing CA" }
        ],
        faqs: [
          { q: "Can a CA help resolve old Income Tax defective return notices in {city}?", a: "Yes, our certified CAs in {city} analyze Section 139(9) and 143(1) notices, recalculate TDS mismatch, and file rectified online responses." }
        ]
      },
      {
        slug: "trademark-company-registration",
        name: "Pvt Ltd Company & Trademark Registration",
        shortName: "Company & Trademark",
        searchIntent: "pvt ltd registration in {city}, trademark filing lawyer, startup incorporation {city}",
        basePriceRange: "₹5,999 - ₹19,999",
        avgResponseTime: "30 Mins",
        satisfactionRate: "99.1%",
        reviewsCount: 420,
        rateCard: [
          { service: "Private Limited Company Incorporation (ROC SPICe+)", price: "₹7,999", duration: "7-10 Days", warranty: "Includes 2 DIN, DSC, PAN, TAN & MOA/AOA" },
          { service: "Trademark Search, Class Selection & TM-A Application", price: "₹3,999", duration: "24 Hours", warranty: "Govt Fees at Actuals + ™ Symbol Right" },
          { service: "Startup India DPIIT Recognition & Tax Exemption Advisory", price: "₹6,999", duration: "5 Days", warranty: "Official Certificate" }
        ],
        faqs: [
          { q: "Can I register a Private Limited company from home in {city}?", a: "Yes, the entire MCA SPICe+ process is 100% digital. You submit identity proofs online and receive your Certificate of Incorporation via email." }
        ]
      }
    ]
  },
  {
    id: "wellness-fitness",
    slug: "wellness-fitness",
    name: "Wellness, Gyms & Lifestyle Hubs",
    shortName: "Wellness & Lifestyle",
    iconName: "HeartPulse",
    color: "#059669", // Emerald green
    bgColor: "rgba(5, 150, 105, 0.12)",
    trafficDensity: "High (🔴 Tier 1)",
    trafficBadge: "🔴 High Traffic (Low Comp)",
    competitionLevel: "Low to Medium",
    monetizationStrategy: "Ad Revenue / Business Subscriptions",
    monetizationType: "subscription-ad",
    ctaPrimary: "Claim 1-Day Free Guest Pass",
    ctaSecondary: "View Membership Price Chart",
    leadPriceEstimate: "₹150 - ₹450 per gym lead / high ad RPMs",
    description: "Discover top-rated fitness centers, CrossFit boxes, classical Yoga ashrams, dental wellness clinics, and Panchakarma retreats with verified membership pricing.",
    services: [
      {
        slug: "gyms-fitness-centers",
        name: "Premium Gyms & Strength Training",
        shortName: "Gyms & Fitness",
        searchIntent: "gyms in {city}, best fitness center with trainer {city}, gym monthly membership fees",
        basePriceRange: "₹1,200 - ₹4,500/mo",
        avgResponseTime: "Instant Free Pass",
        satisfactionRate: "98.7%",
        reviewsCount: 1120,
        rateCard: [
          { service: "Monthly Full Access (Cardio + Strength + Steam)", price: "₹1,499/mo", duration: "30 Days", warranty: "Free Trainer Floor Guidance" },
          { service: "Quarterly Transformation Package (Free Diet Chart)", price: "₹3,999", duration: "90 Days", warranty: "Bi-Weekly InBody Body Composition" },
          { service: "Annual VIP Membership (Locker & Sauna Access)", price: "₹12,499/yr", duration: "365 Days", warranty: "Save Over 45% + 1 Month Freeze" },
          { service: "Dedicated 1-on-1 Personal Training (12 Sessions)", price: "₹5,000", duration: "1 Month", warranty: "Guaranteed Fat-Loss Protocol" }
        ],
        faqs: [
          { q: "What are the typical operating hours of gyms in {city}?", a: "Most premium fitness centers in {city} open from 05:30 AM to 10:30 PM on weekdays, and 06:00 AM to 08:00 PM on Sundays." },
          { q: "Can I get a free trial workout before paying in {city}?", a: "Yes, you can claim a free 1-Day Guest Pass through UrbanSarkari to experience the machines, locker facilities, and training atmosphere." }
        ]
      },
      {
        slug: "yoga-meditation-studios",
        name: "Classical Yoga & Pranayama Studios",
        shortName: "Yoga & Meditation",
        searchIntent: "yoga classes in {city}, hatha yoga studio, meditation retreat near me {city}",
        basePriceRange: "₹1,500 - ₹3,500/mo",
        avgResponseTime: "Instant Batch Slot",
        satisfactionRate: "99.3%",
        reviewsCount: 680,
        rateCard: [
          { service: "Hatha & Vinyasa Flow Morning Batch (Mon-Fri)", price: "₹1,800/mo", duration: "20 Classes", warranty: "Certified Yoga Alliance Teacher" },
          { service: "Pranayama, Breathwork & Sound Meditation", price: "₹1,400/mo", duration: "12 Classes", warranty: "Stress Relief Certified" },
          { service: "Therapeutic Yoga for Back Pain & PCOD/Thyroid", price: "₹3,200/mo", duration: "Personalized", warranty: "Doctor Supervised Poses" }
        ],
        faqs: [
          { q: "Are yoga classes in {city} suitable for complete beginners?", a: "Yes, beginner batches in {city} focus on foundational posture alignment, joint mobility, and gentle breathing techniques." }
        ]
      },
      {
        slug: "ayurvedic-panchakarma-clinic",
        name: "Ayurvedic Treatment & Panchakarma",
        shortName: "Ayurveda & Spa",
        searchIntent: "ayurvedic clinic in {city}, panchakarma therapy cost, abhyanga massage center {city}",
        basePriceRange: "₹1,800 - ₹12,000",
        avgResponseTime: "Same Day Slot",
        satisfactionRate: "99.0%",
        reviewsCount: 490,
        rateCard: [
          { service: "Traditional Full Body Abhyanga Herbal Massage", price: "₹1,850", duration: "60 mins", warranty: "Authentic Medicated Oils" },
          { service: "Shirodhara Therapy for Stress, Insomnia & Migraine", price: "₹2,400", duration: "45 mins", warranty: "Continuous Warm Oil Stream" },
          { service: "7-Day Complete Detox Panchakarma Rejuvenation Package", price: "₹14,999", duration: "7 Days", warranty: "BAMS Doctor Consultations Included" }
        ],
        faqs: [
          { q: "Do Ayurvedic therapies in {city} require an initial doctor consultation?", a: "Yes, certified Ayurvedic vaidyas evaluate your body constitution (Vata, Pitta, Kapha) before administering medicated oils." }
        ]
      },
      {
        slug: "dental-clinic-implants",
        name: "Advanced Dental Care, Braces & Implants",
        shortName: "Dental Care",
        searchIntent: "dentist in {city}, teeth cleaning charges {city}, dental root canal specialist",
        basePriceRange: "₹499 - ₹25,000",
        avgResponseTime: "Appointment in 1 Hour",
        satisfactionRate: "98.5%",
        reviewsCount: 780,
        rateCard: [
          { service: "Ultrasonic Scaling & Teeth Polishing", price: "₹799", duration: "30 mins", warranty: "Plaque & Tartar Free" },
          { service: "Single Sitting Rotary Root Canal Treatment (RCT)", price: "₹3,499", duration: "45 mins", warranty: "Painless Digital X-Ray Check" },
          { service: "Zirconia All-Ceramic Crown / Cap", price: "₹5,500", duration: "2 Visits", warranty: "10-Year Manufacturer Warranty" },
          { service: "Clear Aligners / Invisible Braces Assessment", price: "₹999", duration: "45 mins", warranty: "3D Intraoral Scan Included" }
        ],
        faqs: [
          { q: "Is root canal treatment painful at modern dental clinics in {city}?", a: "No, clinics in {city} use computerized local anesthesia and rotary nickel-titanium tools for virtually painless single-sitting procedures." }
        ]
      }
    ]
  }
];

// Helper: Get Niche by slug
export const getNicheBySlug = (slug) => {
  if (!slug) return null;
  return NICHES.find(n => n.slug.toLowerCase() === slug.toLowerCase());
};

// Helper: Get Service by niche and service slug
export const getServiceBySlugs = (nicheSlug, serviceSlug) => {
  const niche = getNicheBySlug(nicheSlug);
  if (!niche) return null;
  return niche.services.find(s => s.slug.toLowerCase() === serviceSlug.toLowerCase()) || null;
};

// Local neighborhood database mapping for realistic local provider listings
const LOCAL_NEIGHBORHOODS = {
  chennai: ["T. Nagar", "Anna Nagar", "Adyar", "Velachery", "Mylapore", "Tambaram"],
  coimbatore: ["RS Puram", "Gandhipuram", "Saibaba Colony", "Peelamedu", "Saravanampatti", "Ramanathapuram"],
  madurai: ["KK Nagar", "Anna Nagar", "Simmakkal", "SS Colony", "Tallakulam"],
  tiruchirappalli: ["Thillai Nagar", "Cantonment", "K.K. Nagar", "Srirangam"],
  salem: ["Fairlands", "Hasthampatti", "Suramangalam", "Alagapuram"],
  tirunelveli: ["Palayamkottai", "Vannarpettai", "Tirunelveli Town"],
  mumbai: ["Andheri West", "Bandra West", "Dadar", "Powai", "Borivali", "Thane West"],
  pune: ["Kothrud", "Koregaon Park", "Viman Nagar", "Baner", "Hinjewadi", "Aundh"],
  nagpur: ["Dharampeth", "Civil Lines", "Ramdaspeth", "Sadar"],
  nashik: ["College Road", "Gangapur Road", "Indira Nagar"],
  bengaluru: ["Indiranagar", "Koramangala", "Whitefield", "HSR Layout", "Jayanagar", "Malleshwaram"],
  mysuru: ["Gokulam", "Jayalakshmipuram", "Kuvempunagar", "Vijayanagar"],
  mangaluru: ["Kadri", "Kodialbail", "Lalbagh", "Bejai"],
  delhi: ["Connaught Place", "Lajpat Nagar", "Mukherjee Nagar", "Rohini", "Dwarka", "South Extension"],
  hyderabad: ["Madhapur", "Banjara Hills", "Jubilee Hills", "Kukatpally", "Gachibowli", "Ameerpet"],
  warangal: ["Hanamkonda", "Kazipet", "Subedari"],
  ahmedabad: ["Navrangpura", "SG Highway", "Satellite", "Bodakdev", "Maninagar"],
  surat: ["Athwa", "Vesu", "Adajan", "Varachha"],
  vadodara: ["Alkapuri", "Gotri", "Fatehgunj", "Karelibaug"],
  kolkata: ["Salt Lake Sector V", "Park Street", "Gariahat", "New Town", "Ballygunge"],
  howrah: ["Shibpur", "Salkia", "Mandirtala"],
  lucknow: ["Gomti Nagar", "Hazratganj", "Aliganj", "Indira Nagar"],
  kanpur: ["Civil Lines", "Swaroop Nagar", "Kakadeo"],
  noida: ["Sector 18", "Sector 62", "Sector 137", "Greater Noida West"],
  varanasi: ["Sigra", "Bhelupur", "Lanka", "Orderly Bazar"],
  jaipur: ["Malviya Nagar", "Vaishali Nagar", "C-Scheme", "Mansarovar", "Raja Park"],
  jodhpur: ["Shastri Nagar", "Ratanada", "Sardarpura"],
  kochi: ["MG Road", "Kaloor", "Kakkanad", "Edappally", "Panampilly Nagar"],
  thiruvananthapuram: ["Kowdiar", "Vellayambalam", "Pattom", "Kazhakoottam"]
};

// Generate realistic verified provider listings for any city + service combination
export const getVerifiedProvidersForCity = (cityName, citySlug, serviceName, nicheId) => {
  const localities = LOCAL_NEIGHBORHOODS[citySlug.toLowerCase()] || ["City Center", "Main Road", "Civil Station", "Commercial Complex"];
  
  const providersTemplates = {
    "home-services": [
      { prefix: "SuperFast", suffix: "Care & Services", rating: 4.9, reviews: 312, years: 9 },
      { prefix: "UrbanPro", suffix: "Certified Technicians", rating: 4.8, reviews: 245, years: 7 },
      { prefix: "Apex", suffix: "Home Solutions", rating: 4.8, reviews: 189, years: 5 },
      { prefix: "MasterCraft", suffix: "Engineering & Repairs", rating: 4.9, reviews: 420, years: 12 }
    ],
    "coaching-institutes": [
      { prefix: "Pragati", suffix: "Academy & Test Prep", rating: 4.9, reviews: 650, years: 15 },
      { prefix: "Apex Career", suffix: "Institute", rating: 4.8, reviews: 480, years: 11 },
      { prefix: "Vanguard", suffix: "Learning Hub", rating: 4.7, reviews: 320, years: 8 },
      { prefix: "Drona", suffix: "Excellence Campus", rating: 4.9, reviews: 780, years: 18 }
    ],
    "legal-tax-services": [
      { prefix: "Vakil & CA", suffix: "Legal Associates", rating: 4.9, reviews: 290, years: 14 },
      { prefix: "Apex Tax", suffix: "Consultants & Attorneys", rating: 4.8, reviews: 215, years: 10 },
      { prefix: "Chambers of", suffix: "& Partners", rating: 4.9, reviews: 340, years: 16 },
      { prefix: "Corporate", suffix: "Compliance Group", rating: 4.8, reviews: 175, years: 8 }
    ],
    "wellness-fitness": [
      { prefix: "IronPulse", suffix: "Fitness & Gym", rating: 4.9, reviews: 520, years: 6 },
      { prefix: "Veda", suffix: "Wellness & Life Hub", rating: 4.8, reviews: 380, years: 9 },
      { prefix: "Zenith", suffix: "Health & Movement Club", rating: 4.9, reviews: 410, years: 7 },
      { prefix: "Revive", suffix: "Care & Conditioning", rating: 4.8, reviews: 290, years: 5 }
    ]
  };

  const pool = providersTemplates[nicheId] || providersTemplates["home-services"];
  
  return pool.map((item, index) => {
    const locality = localities[index % localities.length];
    return {
      id: `${citySlug}-${index + 1}`,
      name: `${item.prefix} ${serviceName} (${cityName} ${locality})`,
      businessName: `${item.prefix} ${item.suffix}`,
      locality: locality,
      fullAddress: `#${(index + 1) * 14}, 2nd Floor, ${locality} Main Avenue, ${cityName}`,
      rating: item.rating,
      reviewsCount: item.reviews + (index * 23),
      yearsInBusiness: item.years,
      verified: true,
      phoneDisplay: `+91 98${index * 3 + 1}0 24${index * 7 + 1}5`,
      phoneCall: `tel:+9198${index * 3 + 1}024${index * 7 + 1}5`,
      badges: ["100% Background Verified", "GST Registered", "Top Rated 2026"],
      openHours: "07:00 AM - 09:30 PM (Daily)",
      isAvailableNow: true
    };
  });
};
