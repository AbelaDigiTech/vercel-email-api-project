



### Deploying our Express server code to GitHub

Deploying your Express server code to GitHub is a great step to keep it safe and prepare it for hosting platforms (like Vercel).

Before you upload a project to GitHub, make sure your .env file containing your database password and Gmail keys is never uploaded to GitHub.

# Here is the step-by-step guide to doing this perfectly:


# Step 1: Create a .gitignore File

In the root folder of your project, create a new file named exactly:

.gitignore

Inside this file, write the following lines:

node_modules/
.env

This tells Git to ignore your secret keys and your massive node_modules folder.

# Step 2: Initialize Git Locally

Open your terminal inside your project folder and run these three setup commands:

1. Initialize a empty Git repository:

git init

2. Stage all your fixed files:

git add .

3. Commit the files to your local history:

git commit -m "Initial commit: Express server with MongoDB and Nodemailer"


# Step 3: Create a New Repository on GitHub

1. Go to github.com and log in.

2. Click the green "New" button on the left or the "+" icon in the top right corner.

3. Give your repository a name (e.g., vercel-email-api-project).

Crucial: 

Leave "Add a README file", "Add .gitignore", and "Choose a license" UNCHECKED (since we already created ours locally).

4. Click Create repository.

# Step 4: Link Your Code and Push to GitHub

Once the repository is created, GitHub will show you a page with some commands. Look for the section that says "…or push an existing repository from the command line" and copy/paste those commands into your terminal one by one.  But before you run these lines of code:

1. Rename your default branch to main:

git branch -M main

2. Then proceed to run the lines of code:

   (a)  Link your local folder to GitHub (Replace the URL below with your actual repository URL from
        your browser screen):

        git remote add origin https://github.com/YOUR_USERNAME/vercel-email-api-project.git

   (b)  Push your code to the cloud:

        git push -u origin main

# Step 5: Verify Your Success

    - Refresh your GitHub page in your browser. You should now see your project files listed cleanly.

    - Take a quick look to verify that .env and node_modules are not present in the file list. If
      you see your code files like server.js and package.json, your backend code is officially saved and ready for deployment!


### Deploying your Code from GitHub to render.com

Deploying your Express server Code to Render directly from GitHub is an excellent choice. Render will automatically watch your GitHub repository, and every time you push an update, it will automatically redeploy your server code.

## Here is the exact step-by-step process to get your backend live on Render.

# Step 1: Connect Your GitHub Account to Render

1.	Go to render.com and when the page opens, select the GitHub Tab (Tip: It’s better to sign up
    using your GitHub account to save time).

2.	Once inside the dashboard, click the  +New  button in the top right corner.

3.	Select Web Service from the dropdown menu.

4.	On the next screen, Click on the button that is labeled ‘Connect a Repository’ or ‘Deploy a Web
    Service’ – and click on it.  In this way, you grant Render access to your repositories.

# Step 2: Configure Your Web Service Settings

1. Locate your repository (vercel-email-api-project) from the listed repositories and click the
   Connect button next to it.

2. Now, fill out the deployment form exactly like this:
   
•	Name:               vercel-email-api-project (or any unique name you prefer)
•	Region:             Choose the region closest to you (e.g., Frankfurt or Ohio)
•	Branch:             main
•	Language:           Node
•	Build Command:      npm install
•	Start Command:      node server.js (Crucial: Make sure this points to your main file name. 
                        If your main file is named index.js, change this to node index.js).

# Step 3: Add Your Environment Variables (.env)

Since we safely hid our MongoDB URI and Gmail keys inside the .gitignore file, GitHub doesn't know about them—meaning Render won't either unless we add them manually. So we should proceed to add them manually:

1.	On that same configuration page, scroll down and click the Advanced button.
2.	Click Add Environment Variable.
3.	Add your keys exactly as they appear in your local .env file:

Key	                    Value

MONGO_URI	            Your actual MongoDB connection string

GMAIL_USER	            Your project Gmail address

GMAIL_APP_PASS	        Your 16-character Google App Password

# Step 4: Select Instance Type and Deploy

1.	Scroll down to the Instance Type section.
2.	Select the Free tier plan.
3.	Click the prominent blue Create Web Service button at the very bottom of the page.

# Step 5: Monitor the Live Logs

1. Render will now pull your code from GitHub, install your dependencies via npm install, and boot
   up your server.

2. You will see a live terminal console stream on your screen. Wait 1–2 minutes until you see your
   custom success console logs appear in the feed:

Successfully connected to MongoDB
Server listening on port 5000

3. At the top left of your Render screen, right under your project name, you will find your new live
   public URL (it will look something like https://vercel-email-api-project.onrender.com).

## Testing the Production URL in Postman

# To verify everything works globally, go back to Postman and test your live link:

1.	Change your Postman request URL from http://localhost:5000/api/connect to https://your-subdomain.onrender.com/api/connect.

2.	Keep the body format as JSON and your email as:

        {
            osagiepromise79@gmail.com.
        }
            
3.	Hit Send.

⚠️ Note on Free Tier Sleeping: 

Render's free tier spins down the server if it sits idle for 15 minutes without requests. If you test your live link after a long break, the first request might take 30–50 seconds to respond while the server "wakes up." Subsequent requests will be instant!

### Postman Test:

