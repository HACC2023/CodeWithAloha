

<br />
<div align="center">
  <a href="https://github.com/your_username/Ocean-Watch">
   <img src="https://github.com/Alexandra-Haynes/ocean-watch-hacc23/assets/113944962/b8064bb7-3475-4ab3-98c8-7acb09003063" alt="CWA-logo" height="80px">
  </a>
  <h3 align="center">Ocean Watch</h3>
  <p align="center">
    An innovative platform for marine debris management in Hawaii :fish: :blowfish:
    <br />
    <br />
    
  </p>
</div>



![sh1](https://github.com/Alexandra-Haynes/ocean-watch-hacc23/assets/113944962/0092d0c8-9d8a-4d44-ab4a-7793a9067d99)


Ocean Watch is a comprehensive solution to the marine debris problem in Hawaii. Motivated by the urgent need for cleaner oceans, we have developed a platform that empowers everyone to contribute to environmental conservation.

## What Sets Ocean Watch Apart

A user-friendly platform that allows easy reporting of marine debris.
Streamlined processes for disposal companies to manage removal tasks efficiently.
Advanced technology integration for precise location tracking and data analysis.
A commitment to making a tangible impact in marine conservation.

### Built for Everyone

Ocean Watch is designed to be accessible to everyone, from regular users to disposal companies to government agencies. We believe that everyone has a role to play in marine conservation, and we want to make it as easy as possible for people to contribute to this cause.

One big change that we made here was to simplify the classification of biofouling. Instead of the initial subjective point scale, we have simplified it to a 6-point scale, each with built-in examples and descriptions. This makes it easier for regular users to report debris without having to worry about the technicalities of biofouling.

Learn more about the [Level of Fouling Scale here](https://knowledgeauckland.org.nz/media/1820/fouling-rank-scale-updated-guideline-i-davidson-cawthron-auckland-council-2019.pdf).

### Built for Efficiency

Ocean Watch is built to be efficient and effective. We have streamlined the process of reporting marine debris and managing removal tasks to ensure that the right people are notified at the right time.

For example, when a regular user submits a report, the report is automatically sent to disposal companies in the area via. WhatsApp.
This eliminates the need for manual processing and ensures that the report is sent to the right people as soon as possible.

### Built for Impact

Ocean Watch is built to make a tangible impact in marine conservation. We have integrated advanced technologies like AI and data analysis to ensure that our solution is effective and efficient.

For example, we have integrated the OpenAI Vision Preview API to analyze images of marine debris and classify them according to the Level of Fouling Scale. This allows us to automate the process of classifying debris, and it also provides us with valuable data that can be used to inform future conservation efforts.

In the future, we plan on integrating more specific machine learning models. [Here is an example](https://www.nature.com/articles/s41598-021-81011-2) of a machine learning model that can be used to classify marine debris.

## Built With

Our project is built using cutting-edge technologies for a responsive, efficient, and secure experience.

Tools & Resources Used
- Frontend: Next.js for a robust and scalable frontend.
- Backend: PostgreSQL for database management.
- Mapping: Google Maps API for accurate location tracking and mapping.
- AI & Data Processing: OpenAI Vision Preview API for intelligent data analysis.
- Messaging and Communication: WhatsApp API for automated notifications to disposal companies upon new report submissions.
- Deployment: Vercel for reliable and efficient hosting.
- Research & Development: Resources from the Hawaii Pacific University Center for Marine Debris Research and various environmental studies to ensure our solution aligns with real-world needs and scientific data.

 ## 🔧 Setup & Installation
 Follow these steps to get your development environment set up:

### 1. Clone the repository
   Start by cloning the project repository to your local machine

### 2. Install the dependencies:
Navigate to the project directory and install the necessary dependencies

`
npm install
`

### 3.Configure Environment Variables
Create a `.env` file in the root directory of your project. This file will contain the environment variables necessary for the project to run.

```
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_CAPTCHA_SITE_KEY=<your-captcha-site-key>
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<your-google-maps-api-key>
TWILIO_AUTH_TOKEN=<your-twilio-auth-token>
OPEN_AI_API_KEY=<your open ai key>
```

### 4. Configure Database
   Update the `schema.prisma` file to use SQLite as the database provider. This will allow you to run the project locally without having to set up a separate database server.

```
...
datasource db {
  provider = "sqlite"  
  url = env("DATABASE_URL")  
}
...
```

### 5. Initialize the Database   
Run the following command to push the schema state to your database  

`
npx prisma db push
`
### 6. Run the development server  
Launch the development server with  

`
npm run dev
`

The project will be accessible at `http://localhost:3000`.

## 🚀 Exploring Ocean Watch

Ocean Watch can be explored from different user perspectives. Here's a step-by-step guide for each type of user:

1. As a Regular User
- Report Marine Debris
- From the landing page, click on the Report Debris button.
- Fill in the form to simulate reporting found debris. Be sure to include details like location, type of debris, and any additional notes.
- Once you submit the form, your report will be automatically sent to the disposal companies' network.
2. As a Disposal Company Member
- Claim and Manage Tasks
- On the landing page, click the Login button.
- Enter the following demo account credentials:
- Username: `removal`
- Password: `password`
- Upon logging in, you will be directed to the reports dashboard where you can see all submitted reports, including the one you submitted as a regular user.
- Find your report and click Claim Task to assign this task to your organization.
- The task will now be listed in the Claimed Tasks section with a status of "Pending".

[...more steps to come later here]

3. As a CMDR Member
- Administrative Overview
- On the landing page, click the Login button.
- Enter the following demo account credentials for an administrative view:
- Username: `admin`
- Password: `password`
- After logging in, you will have access to an administrative dashboard which provides a comprehensive overview of all reports, tasks, and statistics.

[...more to come]

