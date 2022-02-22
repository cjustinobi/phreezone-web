
import getTime from 'date-fns/getUnixTime'
import format from 'date-fns/format'

export default {
  /*data() {
      return {
          dateFormat: ''
      }
  },*/

  methods: {
    formatDate(dirtyDate) {
      let formattedDates = ''
      if(dirtyDate) {
        formattedDates = format(new Date(dirtyDate), this.dateFormat)
      }
      return formattedDates
    },
    getTime(dirtyDate) {
      let formattedDates = ''
      if(dirtyDate) {
        formattedDates = format(new Date(dirtyDate), this.dateFormat2)
      }
      return formattedDates
    }
  }
}
