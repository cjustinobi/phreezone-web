

export default {

  methods: {
    async saveFile(e) {
      // const file = e.target.files[0];
      const file = e

      /* Make sure file exists */
      if (!file) return console.log("No file");

      /* create a reader */
      const readData = (f) =>  new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(f);
      });

      /* Read data */
      const data = await readData(file);

      /* upload the converted data */
      return this.$cloudinary.upload(data, {
        folder: 'phreezone',
        upload_preset: 'foodie_preset'
        // public_id: 'foodie_id'
      })
    },
  }

}
