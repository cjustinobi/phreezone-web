export default function ({ app, redirect }) {
console.log(app.$auth.state.user)
  if (app.$auth.$state.user.isAgent != 1 ) {
    return redirect('/home')
  }
}
