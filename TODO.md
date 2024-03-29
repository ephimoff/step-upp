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
- [x] Refresh `myprofile` after profile is created
- [x] Don't allow the same user add 360/Feedback to an existing one. Instead rewrite the score
- [x] Add a creation of the token when a request sent
- [x] Protect the feedback page and won't allow to access it without a token
- [ ] Think how to not show the token in the address bar. Maybe to use a 'proxy' page, check the token there and return to this one afterwards? Or use a middleware. Maybe middleware?
- [x] Send an email when requesting feedback
- [ ] Removed expired tokens from the DB
- [ ] Update all users with the company name to limit the scope of users
- [ ] Think about not allowing to feedback-assess your own profile
- [x] Fix the avatar quality

### Nice to have

- [x] Rename 360 to Feedback Score or the likes
- [x] Fix the sidebar shrinking
- [x] Add feedback from buttons, i.e. 'Sent', 'Saved' etc.
- [ ] Update the colours for the secondary buttons to match the logo
- [ ] Allow to change the picture
- [ ] Replace `myprofile` with `newUser` endpoint from next-auth
- [ ] Add actions and tips or remove them for the first version
- [ ] Add animations transitions for popups
- [ ] When opening the feedback screen load the previous user assessments
- [ ] Make the desing a bit more "enterprisee"

## Bugs

- [x] Fix input labels in different resolutions. They hide behind the field and doesn't wrap
- [x] Fix sidebar. It opens up again when clicks on a link. Maybe I need to use React Context to preserve the state of the sidebar across the pages
- [x] Fix the sidebar for small height screens. it hides the menu on the top. Maybe need to add `overflow:hidden`
- [ ] Store the state of the sidebar locally so it preserves after the refresh
- [ ] Fix an issue with the progress bar when adding a new competency. Somehow it appears cyan

## Production-ready

- [ ] Logging
- [ ] Monitoring
- [ ] Containers?
- [ ] Testing. Jest?

## Notes
