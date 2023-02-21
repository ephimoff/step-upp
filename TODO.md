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
- [ ] Add an expiration token for accessing feeback page
- [ ] Send an email when requesting feedback
- [ ] Protect the feedback page and won't allow to access it without a token
- [ ] Update all users with the company name to limit the scope of users

### Nice to have

- [x] Rename 360 to Feedback Score or the likes
- [x] Fix the sidebar shrinking
- [ ] Allow to change the picture
- [ ] Replace `myprofile` with `newUser` endpoint from next-auth
- [ ] Add actions and tips or remove them for the first version
- [ ] Add animations transitions for popups
- [ ] When opening the feedback screen load the previous user assessments
- [ ] Make the desing a bit more "enterprisee"
- [x] Add feedback from buttons, i.e. 'Sent', 'Saved' etc.

## Bugs

- [x] Fix input labels in different resolutions. They hide behind the field and doesn't wrap
- [x] Fix sidebar. It opens up again when clicks on a link. Maybe I need to use React Context to preserve the state of the sidebar across the pages
- [ ] Store the state of the sidebar locally so it preserves after the refresh
- [ ] Fix the sidebar for small height screens. it hides the menu on the top. Maybe need to add `overflow:hidden`
- [ ] Fix an issue with the progress bar when adding a new competency. Somehow it appears cyan

## Notes
