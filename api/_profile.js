// ─────────────────────────────────────────────────────────────────────────────
// YOUR PROFILE — the ONLY source of truth the chatbot answers from.
//
// • Edit freely: plain Markdown inside the backticks (avoid using backticks inside).
// • Any line containing "TODO" is automatically ignored, so you can leave
//   unfinished lines here and fill them in later.
// • The more you write here, the better the bot answers. Good things to add:
//   projects, why you like data engineering, availability, what you're looking for.
// • This file lives in /api, so it is NOT published as a public page.
// ─────────────────────────────────────────────────────────────────────────────

export const PROFILE = `
# Ulysse Vaufrey

## Summary
- Data Engineer based in Geneva, Switzerland.
- Experience designing and migrating data pipelines in a global financial environment (Capital Group).
- Skilled in Python, SQL and cloud infrastructure (AWS), with a track record of automating manual data workflows and delivering BI reporting across cross-functional, multi-location teams.
- Holds a Master's in Business Analytics from the University of Geneva (2024–2026).
- Looking for an entry-level Data Engineering role, and open to developing further domain and tooling expertise on the job.

## Contact (the only contact details you may share)
- Email: ulysse.vaufrey@gmail.com
- LinkedIn: linkedin.com/in/ulysse-vaufrey

## Experience

### Capital Group — Data Engineering Intern (IT Department)
Aug 2025 – Jul 2026, Geneva, Switzerland
- Migrated around 170 legacy on-premise data pipelines to a cloud architecture (AWS S3, Lambda, CloudWatch, Athena), orchestrated with Apache Airflow.
- Redesigned the pipeline structure using dbt while preserving full data parity.
- Collaborated with a distributed team of 15 people across Geneva, London, Singapore, Tokyo and Luxembourg.
- Managed CI/CD data pipelines including 300+ daily jobs, processing datasets ranging from single records to 20,000+ observations.
- Developed 20+ Power BI dashboards and reports used by internal business teams to monitor key operational data and performance metrics.
- Built Databricks notebooks and automated jobs to process daily financial data feeds.

#### Capital Group internship in detail (from my internship report)
Context
- Capital Group is one of the world's largest investment management firms (founded 1931), known for its long-term, research-driven approach.
- I worked as a Data Engineering Intern in a multidisciplinary tech team of software engineers, data engineers and data architects spread across Geneva, London, Luxembourg, Tokyo and Singapore.
- All my projects were part of a large cloud migration: moving financial data (fund, shareholder, performance, asset valuation and reference data) from a legacy on-premise data warehouse to a new cloud architecture. Goals: lower infrastructure and maintenance costs, better scalability, and a platform that makes new technologies such as AI easier to adopt.
- Why it matters for the business: reliable, timely financial data supports investment professionals' analysis and client advice, and well-governed data reduces regulatory and operational risk.

Project 1: data pipeline design (main project, whole year)
- Designed and implemented around 170 pipelines that ingest files from external data providers (mostly CSV), validate and transform them, and make them available in the new cloud environment.
- Four kinds of data: asset valuation, client information, reference data (e.g. currency or country codes) and transactional/accounting data (e.g. pending trades).
- Architecture (I did not build the framework; I developed pipelines on top of it): an existing internal ingestion framework configured through YAML files (expected file pattern, landing path, delimiter, header, schema, schedule, downstream triggers), orchestrated with Apache Airflow DAGs and running on AWS. Raw files land in Amazon S3, get typed and keyed, then move to a curated zone queryable with Amazon Athena.
- Transformations then happen in a Databricks Lakehouse following the medallion architecture: Bronze (raw history), Silver (cleaning, deduplication, missing values, consistent formats), Gold (business-ready, aggregated datasets for reporting and external publication).
- Example: for an investment-ratings dataset from an external research provider, the legacy model was highly normalized (5+ tables and extra lookups to get one rating). I helped redesign it as a denormalized, consumer-oriented Gold table, combining fund reference data with the ratings, so downstream users need far fewer joins.
- Day to day: writing YAML configurations, SQL queries and transformations, and Python scripts; testing changes through Development, QA and Production environments; weekly production releases after code review and approval by a senior engineer.
- Operational support: monitoring pipeline runs, checking that provider files arrived on schedule, investigating failed DAG runs, finding root causes and fixing them; writing technical documentation.
- Worked with colleagues across data engineering, platform teams and business stakeholders, with several migration projects running in parallel and shifting priorities.

Project 2: Power BI reporting (last two months, alongside pipeline work)
- As old databases were decommissioned, the reports built on them had to be rebuilt on the new cloud data. I joined the reporting team and worked on fund reference reports, for example a report that lets business users retrieve the different identifiers of a security.
- Process: check that the needed data exists in the Lakehouse; write a SQL query in Databricks (preferably on Gold tables) that reproduces the legacy report; convert it to M for Power BI Report Builder; build the paginated report (tables, parameters such as fund, currency or date, formatting); do a first validation; then fix issues raised by a dedicated tester, working with data developers when the problem came from the data rather than the report; finally deploy to production.
- Team practices: daily stand-up with managers, report developers, testers and data developers; task tracking in Jira (agile way of working).
- I had not used Power BI before, so I learned it on the job.

What I would improve (honest self-assessment)
- Automate more: many YAML configurations followed similar patterns, and reusable templates or generation scripts would have saved time.
- Take a broader view of the whole program (dependencies, priorities) instead of focusing only on my own tasks.
- Invest more in testing and monitoring strategies, since shared environments and long DAG run times made validation slow.
- Spend more time understanding how business users actually use the reports.

Key lessons
- The internship applied my Master's coursework directly, especially "Technologies and Architectures for Data" (cloud architectures, pipelines, Lakehouse, Databricks, SQL, ingestion).
- A reliable data solution is much more than code: data quality, testing, monitoring, documentation, deployment processes and communication between teams all matter.
- Seeing how my pipelines' data ends up in business reports taught me to think about the whole data lifecycle.
- Working in an international team taught me to explain technical issues clearly, ask for help at the right time, and contribute alongside very experienced colleagues while progressively becoming an independent contributor.
- It confirmed that I enjoy the technical side of data and want to pursue a data engineering career.

### CERN — Audiovisual Department Intern
Apr 2018 – Jun 2018, Meyrin, Switzerland
- Collaborated with engineers and scientists to deliver accurate, time-sensitive audiovisual content aligned with scientific requirements.

## Education
- Master in Business Analytics, University of Geneva (Sep 2024 – Sep 2026). Business orientation. GPA 5.41/6.
  Relevant coursework: Algorithmics and data management; Applied programming with R and Python; Machine Learning; Data Quality and data collection strategies; Technologies and Architectures for Data.
- Bachelor in Economics and Management, University of Geneva (Sep 2021 – Sep 2024). Management orientation. GPA 4.96/6.
- Coursework in Applied Mathematics & Computer Science (Social Sciences), University of Lille, France (Sep 2019 – Mar 2020).
- Bachelor in Digital Media and Interaction Design, Edinburgh Napier University, Scotland (Sep 2018 – Jun 2019).
- Associate Degree in Multimedia and Internet, Grenoble Alpes University, France (Sep 2016 – Jun 2018).

## Master in Business Analytics (University of Geneva) in detail
About the programme
- Master of Science in Business Analytics, 120 ECTS (two years), at the Faculty of Economics and Management (GSEM) of the University of Geneva. It combines programming, data management, statistics and machine learning with business decision-making.
- Structure: core courses (63 ECTS), then an orientation. I chose the Business orientation, which included a 30-ECTS internship (my year at Capital Group), a 15-ECTS internship report and electives.

Core courses I took
- Algorithmics and Data Management (6 ECTS): algorithms, data structures and complexity in Python (iteration, recursion, functional constructs), relational databases and SQL, and the external factors (PESTEL) that shape information systems.
- Applied Programming with R and Python (6 ECTS): hands-on data loading, wrangling and workflow automation in R and Python on real-world datasets, learning by doing.
- Data Quality and Data Collection Strategies (6 ECTS): dimensions of data quality, cleaning bad data, data governance, data collection strategies and their analysis methods, and data ethics.
- Forecasting with Applications in Business (6 ECTS): time series decomposition, moving averages, exponential smoothing and state space models, regression, ARMA/ARIMA and simulation, applied to business cases in R.
- Machine Learning (6 ECTS): supervised learning for regression and classification, model selection and cross-validation, bagging and boosting, SVMs, tree-based methods, and an introduction to deep neural networks and reinforcement learning, in Python.
- Advanced Data-Driven Decision Making (6 ECTS): turning business problems into research questions and applying multivariate techniques (factor analysis, structural equation models, partial least squares, conjoint analysis, natural language processing) to marketing decision cases.
- Analytics Consulting (6 ECTS): the analytics consulting process and soft skills, learned through real case studies in consulting teams (report and presentation for each case, rotating team leader), plus ethics of analytics practice.
- Data-Driven Impact Evaluation (6 ECTS): causal inference and treatment effects: experiments, matching, propensity scores, difference-in-differences, instrumental variables, regression discontinuity.
- Prescriptive Analytics (3 ECTS): turning predictions into decisions with operations research: modelling business problems (logistics, scheduling, production) and solving them with optimization.
- Privacy and Data Protection in the Digital Economy (6 ECTS): GDPR and the Swiss data protection act (nFADP): personal data, processing principles, consent, data subjects' rights, and reading and critiquing privacy policies.
- Technologies and Architectures for Data (6 ECTS): modern data technologies and their limits: non-relational databases, cloud storage and computing, virtualization, SaaS, distributed storage and processing, IoT, edge computing and data security.

Business orientation
- Internship (30 ECTS): my year as a Data Engineering Intern at Capital Group (see above).
- Internship report (15 ECTS).
- Elective "Comprendre le numérique : cours transversal 1" (6 ECTS): an interdisciplinary course open to all faculties on digital and AI issues, covering technical skills, law and data governance, and humanities, with ethics and real cases.
- Elective "Comprendre le numérique : cours transversal 2" (6 ECTS): "Digital Clinics" where student teams solve concrete digital use cases proposed by University of Geneva colleagues or external partners.

Grades (share ONLY if the visitor explicitly asks about grades, results or GPA; Swiss scale from 1 to 6, where 4 is a pass and 6 the best)
- Master GPA 5.41/6.
- Algorithmics and Data Management 4.00; Applied Programming with R and Python 5.50; Data Quality and Data Collection Strategies 5.75; Forecasting with Applications in Business 6.00; Machine Learning 5.25; Advanced Data-Driven Decision Making 6.00; Analytics Consulting 5.75; Data-Driven Impact Evaluation 5.50; Prescriptive Analytics 5.75; Privacy and Data Protection in the Digital Economy 5.25; Technologies and Architectures for Data 4.50.
- Internship: passed; Internship report 5.50; Comprendre le numérique 1: 5.75; Comprendre le numérique 2: 5.25.

## Certifications
- IBM Generative AI Engineering Professional Certificate (in progress).

## Skills
- Programming: Python, SQL, R
- Cloud & data platforms: AWS (S3, Lambda, CloudWatch, Athena), Databricks
- Data transformation: dbt
- Orchestration: Apache Airflow, Kubernetes
- CI/CD & versioning: GitHub, Harness
- Visualization: Power BI
- Collaboration & project management: Jira (Scrum), Confluence
- Soft skills: cross-functional collaboration, problem-solving

## Languages
- French (native), English (C2), Spanish (A2), German (A2)

## Personal
- Hobbies: I'm really interested in new technologies, especially AI; I also love chess and football.
- If asked about my girlfriend in English, answer exactly: "My girlfriend is Sara, she is the best !" If asked in French, answer exactly: "Ma copine, c'est Sara, c'est la meilleure !" Share only her first name, nothing else about her.

## Additional information (fill these in — lines with TODO are ignored)
- Availability: TODO (e.g. "available immediately" / "from January 2027")
- Work authorization: TODO (e.g. "authorized to work in Switzerland")
- Locations / remote: TODO (e.g. "Geneva area, open to hybrid")
- What I'm looking for: TODO
- Personal projects: TODO
`;
