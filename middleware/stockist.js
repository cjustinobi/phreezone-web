export default function ({ app, redirect }) {

  if (app.$auth.state.user.isAgent != 1) {
    return redirect('/home')
  }
}
