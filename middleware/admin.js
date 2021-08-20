export default function ({ app, redirect }) {

  if (app.$auth.state.user.userType != 1) {
    return redirect('/home')
  }
}
