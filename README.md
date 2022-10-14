# aarbnb
One stop shop for all things Aarbnb

# Project roadmap
- [x] User can see an application
- [ ] Host can see all submitted requests
- [ ] Only authorised users should be able to visit the application
- [ ] User can create an account
- [ ] Host has their own "Host" view
- [ ] Host can manage requests
- [ ] Host is notified when requests are submitted
- [ ] User should be notified when request statuses change
- [ ] --- MVP Ready ---
- [ ] User can view their own profile
- [ ] User can have request shortcuts
- [ ] User can create custom shortcuts

# Feature Stories
User can see an application
**As** a user
**When** I visit the landing page
**Then** I see the Aarbnb logo
**And** I see a button "Make a Request"
**When** I click the button
**Then** I see a submission form for a request that allows a user to input a title and notes
**When** I fill out the form and submit a request
**Then** I see a notification indicating the "Request has successfully been submitted"

Host can see all submitted requests
**As** the host
**When** I visit "/host"
**Then** I see a list of all submitted requests
**When** I click on a request
**Then** I can see details for that request
    - Details include: title, timestamp, notes, user

Only authorized users should be able to visit the application
**As** any user
**When** I visit the website for the first time on any route
**Then** I am prompted with a basic log-in screen asking for a password
**When** I successfully input the password, I am redirected to the landing page
**If** I incorrectly input the password, I see an error message saying "password is incorrect"

User can create an account
**As** a user
**When** I visit the site without being logged in
**Then** I am prompted to log in/sign up for an account
**If** I choose to sign up, I can input my first and last name along with an email and phone number (no password, too much work)
**And When** I finish signing up
**Then** I am redirected to the landing page
**And** I see that I am logged in in the corner of the application
**If** I choose to log in
**Then** I see a prompt to log in by phone number/email
**And When** I successfully log in
**Then** I am redirected to the landing page

Host has their own "Host" view
**As** the host
**When** I visit the landing page
**Then** I see a view for pending/completed requests
**And** The "/host" route no longer exists

Host can manage requests
**As** the host
**When** I visit the landing page
**Then** I can manage my requests by marking them "To Do", "In Progress", or "Completed"
**When** I change a status
**Then** I see the requests organized into different columns by status

Host is notified when requests are submitted
**As** a user
**When** I submit a request
**Then** the request is successfully submitted and 

User should be notified when request statuses change
**As** the host
**When** I change the status of a request
**Then** a push notification is sent out to the user who submitted the request based on their preferred method of contact

User can view their own profile
**As** a user
**When** I click on my user icon in the corner
**Then** I see an option for "View Profile"
**When** I click "View Profile"
**Then** I see a profile page with my basic information
**And** I see a section listing out my submitted requests

User can have request shortcuts
**As** a user
**When** I am signed in and am on the landing page
**Then** I see a section "Shortcuts"
**And** within the section, I see a default shortcut with a water icon
**When** I click the water icon
**Then** a request is automatically submitted to the host asking for water

User can create custom shortcuts
**As** a user
**When** I look at the "Shortcuts" section
**Then** I see an option with a "plus" icon
**When** I click the icon
**Then** I see a modal to create a custom request
**When** I finish creating the custom request
**Then** I see a new icon/name under "Shortcuts"