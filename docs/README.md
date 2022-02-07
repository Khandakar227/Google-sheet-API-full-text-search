# Authenticating Google Sheets API

### Step 1:
1. Go to [google cloud console](https://console.cloud.google.com). In the navigation menu go to **IAM & Admin** > **Service Accounts**

![Go to IAM & Admin > Service Accounts](./go_to_iam&admin.png)

2. Create service account.

![Create a service account](./create_sa.png).

3. Search for Google Sheet API. Enable it and wait for a few seconds it will redirect you to api & services

![Search for Google sheet api](./search_gsa.png)

![Enabling Sheet API](./enable.png)

4. From there go to Credentials. Click on your service account.

![Select a service account](./click_sa.png)

5. Click **on add key** > **Create new key**. Your authentication credentials will be downloaded (which is a JSON file). ***Keep it private.*** It is a super secret file that should not be in public. 

![Add a key](./add_key.png)

6. Copy the **client_email** and **private_key** value to your .env file.
