// Function to retrieve the analyst name from local storage
        function getAnalystNameFromStorage() {
            return localStorage.getItem('analystName') || '';
        }

        // Function to save the analyst name to local storage
        function saveAnalystNameToStorage(name) {
            localStorage.setItem('analystName', name);
        }

        // Function to populate the analyst name input field
        function populateAnalystName() {
            const analystNameInput = document.getElementById('analyst-name');
            const savedName = getAnalystNameFromStorage();
            if (savedName) {
                analystNameInput.value = savedName;
            }
        }

        // Call the populateAnalystName function when the page loads
        window.addEventListener('DOMContentLoaded', populateAnalystName);

        // Function to handle analyst name changes and save to local storage
        document.getElementById('analyst-name').addEventListener('input', function() {
            saveAnalystNameToStorage(this.value);
        });
		
	
        function showDetail(tileNumber) {
            
			const details = {
			// All Solutions Responses [Prefix 1xxx]
                1001: "We're reaching out to inform you that we're closing your ticket as we will require any further action or change regarding this request will require approval from your Director/Operations Manager/Head of Unit.\nShould you wish to pursue this matter further, please ensure to obtain the necessary approvals. \nIf you have any questions or need assistance navigating this process, feel free to reach out to us, and we'll be happy to guide you through it.",
				1002: "",
				1003: "We're reaching out to inform you that unfortunately we're closing your ticket as we are unable to implement the requested change in the system due to technical limitations within the EMR.\n\n[Insert reason why, what we have done and how we have tried to resolved this  (i.e., weekly enhancement and optimisation meeting discussion, reached out to UCern community, HTS constraints etc)]\n\nIf you have any questions, please feel free to reach out to us and discuss further.",
				1004: "We're reaching out to inform you that this issue is still being investigated. As this is a long-standing issue which will require our vendor to investigate further we are closing this ticket and logging a Problem ticket. This Incident will be linked to the new Problem ticket.\n\nThe new Problem ticket ID is [Problem Ticket ID].\n\nYou will be notified once this Problem is fully resolved via email.\n\nIn the meantime please continue to log further individual cases as we can add this as evidence to the main ticket.",
				1005: "This issue has been resolved, please reach out if you experience any further issues or errors.",
				1006: "We have not heard back from you and are not sure if you still require this ticket. We are closing this ticket however if you still need assistance please write back with the required information.",
            // Core Responses [Prefix 2xxx]
				2001: "This users access has now been created. Please get the user to log on to the EMR at their earliest convenience,  if the user is facing any issues with their login please get them to log a Cherwell ticket detailing any issues they are facing.",
				2002: "This access request has now been completed. If any user is facing issues with their login please get them to log a Cherwell ticket detailing any issues they are facing.",
				2003: "Please ensure when you’re creating a patient list that you select the Encounter Type filter as 'Inpatient'. You are seeing patients with a 'pre-admit' in your list, this is expected behaviour. For more information on how to alter your patient list see the following QRG: https://emr-media.nh.org.au/wp-content/uploads/2023/08/Allied-Health-Patient-Lists-Location-and-Medical-Service.pdf. Please let us know once changing this setting if your issue persists.",
				2004: "To fix the failure with mapped account error you need to reset your password. To achieve this you can either click CTRL + ALT + DEL on any NH computer and select 'Reset Password' and follow the prompts. Or you can call NH Service Hub on 834 55555 and request a password reset. Please reach out if you have any further issues after the password reset.",
				2005: "When a new clinic is created or an existing clinic changes the clinic code the EMR team needs to be informed. This is because the EMR team needs to configure the code within the EMR, if this is not done prior to booking a patient in iPM the patient will not show up on the Home screen within the EMR. This clinic has now been set up correctly within the EMR, however any patient who was booked prior to now will need to have their appointment re-triggered from iPM. To achieve this you need to edit the appointment within iPM and add a full stop to the comments field within the Dependent Resources tab. If you require further help with re-trigerring of iPM appointments please reach out to the Outpatients department.",
				2006: "Please have your Manager fill in the account Creation/Modification Cherwell request. We will require your Username, Full Name, EMR Role/Title and your EMR Position. ",
				2007: "This patient was discharged statistically (incorrectly) in iPM which leaves the encounter in an active status. I have changed the discharge method to home now so the patient will be discharged within the EMR.",
				2008: "Please use the MyExperience button on the toolbar to switch your position to the correct role. Once completed please log out of the EMR and open the app you require. See this QRG for more information: https://emr-media.nh.org.au/wp-content/uploads/2023/08/Nurses-%E2%80%93-MyExperience-Changing-Positions-in-EMR.pdf",
				2009: "When a patient has a pre-admission due to a waitlist but is also statistically discharged and admitted the EMR cannot combine all three encounters together at once. This is a known issue with no resolution. We have merged the encounters together now so it should reflect correctly in the EMR.\n\nPlease review the patient chart as some medications, orders and tasks may be duplicated. Please continue to notify us of future cases.",
				2010: "This is a Home Visiting Services patient e.g. HITH/MOAH etc. which means the patient is discharged from ED and ward transferred from HITH to the Inpatient ward. Please see the following QRG for more information on how the encounters work in the EMR: https://emr-media.nh.org.au/wp-content/uploads/2023/10/FirstNet-ED-Home-Visiting-Services-HITH-MOAH-More-Presenting-to-ED.pdf.\n\nNote that Medications prescribed in the ED encounter do not carry over to the inpatient ward encounter and therefore cannot be administered once the patient is admitted to the ward. The following QRG will explain in more detail: https://emr-media.nh.org.au/wp-content/uploads/2024/03/Doctors-%E2%80%93-Medication-Management-%E2%80%93-HITH-transfers-of-care.pdf.",
				2011: "The patient should now be in the correct location. This patient required a re-trigger of their admission in iPM. This can be required sometimes when a single encounter logic episode has had updates to a previous admission. Please see the following QRG for more information https://emr-media.nh.org.au/wp-content/uploads/2023/08/Administration-Re-Trigger-Information-to-Encounter.pdf",
			// Care Delivery [Prefix 3xxx]
				
			// FirstNet [Prefix 4xxx]
				
			// SurgiNet [Prefix 5xxx]
				
			// Maternity [Prefix 6xxx]
				
			// Orders & Results [Prefix 7xxx]
				
			// Devices [Prefix 8xxx]
				
			// Medications [Prefix 9xxx]
				
			
            };
            const analystName = document.getElementById('analyst-name').value;
			const customerName = document.getElementById('customer-name').value;
			const greeting = "Dear [Customer Name],\n\n" 
			const closing = "\n\nThank you, [Analyst Name]." 
			let detailText = details[tileNumber];
			detailText = greeting + detailText + closing // Add Dear Customer + From Analyst
			detailText = detailText.replace("[Analyst Name]", analystName);
			detailText = detailText.replace("[Customer Name]", customerName);
			
			
			document.getElementById('grid-container').style.display = 'none';
            document.getElementById('detail-text').innerText = detailText;
            document.getElementById('detail-view').style.display = 'flex';
            document.getElementById('page-description').style.display = 'none';
			document.getElementById('input-names').style.display = 'none';
			document.getElementById('page-title').style.display = 'none';
		}

        function goBack() {
            document.getElementById('detail-view').style.display = 'none';
            document.getElementById('grid-container').style.display = 'block';
			document.getElementById('page-description').style.display = 'block';
			document.getElementById('input-names').style.display = 'flex';
			document.getElementById('page-title').style.display = 'block';
			
        }

        function copyToClipboard() {
            const detailText = document.getElementById('detail-text').innerText;
            navigator.clipboard.writeText(detailText).then(() => {
                showNotification();
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        }

        function showNotification() {
            const notification = document.getElementById('notification');
            notification.classList.add('show');
            notification.classList.remove('hide');

            setTimeout(() => {
                notification.classList.add('hide');
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 500);
            }, 2000);
        }