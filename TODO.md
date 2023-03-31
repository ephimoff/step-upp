# TODO

## Features

### Must to have

- [x] Add validation to the fields on the `/profile` screen
- [x] Rewrite the logic of the `/profile` using either SWR or useForm or Formik
- [x] Set up some styles for buttons so they are consistent
- [x] Generate slug automatically
- [x] Check it ^^^ for uniqueness
- [x] Add a picture from the SSO service
- [x] Add email login
- [x] Refresh instantly the view of competencies right adding a new competency
- [x] Refresh `/account` after profile is created
- [x] Don't allow the same user add 360/Feedback to an existing one. Instead rewrite the score
- [x] Add a creation of the token when a request sent
- [x] Protect the feedback page and won't allow to access it without a token
- [x] Send an email when requesting feedback
- [x] Fix the avatar quality
- [x] Switch all development to `development` branch
- [x] Switch env vars on Vercel to `development` env
- [x] Fix issue with the `<Image>` src as this doesn't work atm
- [x] Add `/myprofile` page
- [x] Show all profiles
- [x] Add search for profiles
- [x] Improve search to be more fuzzy and not to search only by name
- [x] Show workspace info
- [x] Allow to edit workspace info
- [x] Add users to a workspace on signup
- [x] Add users to the existing the workspace on signup based on their domain
- [x] Allow to delete Domains
- [x] Add Admin check for the sidebar
- [x] Update all users with the company name to limit the scope of users
- [x] Multi-tenancy: Restrict content by workspace
- [ ] Think how to not show the token in the address bar. Maybe to use a 'proxy' page, check the token there and return to this one afterwards? Or use a middleware. Maybe middleware?
- [ ] Remove expired tokens from the DB
- [ ] Add other permissions
- [ ] Make sure users with no admin permissions cannot get to the restricted pages using url
- [ ] Think about not allowing to feedback-assess your own profile
- [x] Prepare functionalityu for competency packs
- [ ] Allow to edit competencies
- [ ] Consider encoding the query parameters for the search. It now contains `workspaceId` which is potentially a sensetive info. Alternatively, replace `GET` with `POST` for search

### Nice to have

- [x] Rename 360 to Feedback Score or the likes
- [x] Fix the sidebar shrinking
- [x] Add feedback from buttons, i.e. 'Sent', 'Saved' etc.
- [x] Update logo on the sign in screen
- [x] Update the colours for the secondary buttons to match the logo
- [x] When reseting search remove the field from the search input
- [x] Add a popup message when a profile needs to be created
- [x] Add actions and tips or remove them for the first version
- [ ] Update the login buttons to match the styles of the providers (google, github, etc)
- [ ] Allow to change the picture
- [ ] Add animations transitions for popups
- [ ] When opening the feedback screen load the previous user assessments
- [ ] Make the desing a bit more "enterprisee"
- [ ] Update the header of the profile page: font colour and NoAvatar
- [ ] Refactor all formik forms with the new Formik component
- [ ] Submitting form second time without reloading form doesn't trigger the success check. Need to figure how to fix it
- [ ] Update the display of the logo when the sidebar get thiner
- [ ] Align the styling of elements: cards and headers
- [ ] Add more packs

## Bugs

- [x] Fix input labels in different resolutions. They hide behind the field and doesn't wrap
- [x] Fix sidebar. It opens up again when clicks on a link. Maybe I need to use React Context to preserve the state of the sidebar across the pages
- [x] Fix the sidebar for small height screens. it hides the menu on the top. Maybe need to add `overflow:hidden`
- [ ] Store the state of the sidebar locally so it preserves after the refresh
- [ ] Fix an issue with the progress bar when adding a new competency. Somehow it appears cyan

## Production-ready

- [x] Logging
- [ ] Monitoring
- [ ] Containers?
- [ ] Testing. Jest?
- [ ] Promote to Prod only when tests (automated and manual) are succesfull

## Notes
