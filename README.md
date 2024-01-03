# MedStock Manager ([live on Heroku](https://medstock-manager-9ef045b5bcdf.herokuapp.com/))
## Date: 12/16/2023
### By: John Hansen
**[GitHub](https://github.com/johnhansengit) | [LinkedIn](https://www.linkedin.com/in/jhansen-software-engineer/)**
***
#### **_Description_**
MedStock Manager is a full-stack pharmacy stock management app built on the MEN stack (MongoDB, Express, Node), with Google OAuth for secure user authentication and third-party API integration. 

Features include:

- Only authorized users are able to sign in
- Current user is displayed at bottom-left of screen, so that if someone leaves themselves logged on by accident, the next user will not mistake the dataset for their own
- Drug stock is automatically grouped by family
- Drug stock is searchable by any keyword (e.g., name, family, dose, form), and filterable by whether the item has been starred for 'quick refererence'
- Expiration dates turn yellow when less than one month away, and pink when expired; expired stock is not counted towards total stock
- When the stock for a particular lot number is zeroed out, it is automatically deleted
- All ins and outs are recorded in the Ins/Outs log
- The Order page automatically compiles a list of drugs that are below the par alert level (120% of par level), and should therefore be considered for ordering
- On the drug item overlay view, the drug name can be clicked to search it in the FDA's API of drug information; alternatively, the API can be searched for any drug via the Drug Info page

#### **_Technologies_**
- HTML
- SASS/SCSS
- JavaScript
- AJAX
- Express.js
- MongoDB
- Mongoose
- Gulp
- Passport.js
- Google OAuth
- Gulp
- Third-party API

#### **_Trello Board_**

[Trello](https://trello.com/invite/b/8U6cnzJz/ATTI0ff174408218be975cd5a9e9abc7c6c59CF0A10F/medstock-manager-project-planning)

#### **_Wireframe_**

[DrawIO](https://drive.google.com/file/d/1P9PnzKKFhuUitX9AcIqIVSzH63mpM0sx/view?usp=sharing)

#### **_Data Models_**

[Lucid](https://lucid.app/lucidchart/205ba7c6-727e-440e-a821-e8746256dd60/edit?viewport_loc=-1852%2C-962%2C3328%2C1592%2C0_0&invitationId=inv_e3e825f8-4607-4b50-9542-bbc2c148995c)

#### **_Planned Future Updates_**
- [ ] Integrate with ordering system, or else generate populated order form in pdf format
- [ ] Native user authentication and user sign-up process
- [ ] Responsive/mobile desisgn
- [ ] Sandbox mode, for non-users to see the app in action
- [ ] Add family functionality
- [ ] Tracking of Average Monthly Consumption (AMC), yielding longer term prediction of order needs, and recommendations for order quantities
- [ ] Searchable Ins/Outs

#### **_Credits_**
- Normalize CSS: [Normalize.css](https://cdnjs.com/libraries/normalize)
- Fonts: [Google Fonts](fonts.google.com)
- Landing page background image: [Free Stock photos by Vecteezy](https://www.vecteezy.com/free-photos)
- Star icon: [IconPacks](https://iconpacks.net/?utm_source=link-attribution&utm_content=7203)
- API: [OpenFDA](https://open.fda.gov/)