export default function ({ app, redirect }) {

  if (app.$auth.state.user.userType != 1 || app.$auth.state.user.userType != 2) {
    return redirect('/home')
  }
}
