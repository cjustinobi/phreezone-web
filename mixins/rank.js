
export default {
  filters: {
    rank (value) {
      if (!value) return ''
      let r;
      switch(value) {
        case 'd1':
          r = 'Diamond 1'
          break;
        case 'd2':
          r = 'Diamond 2'
          break;
        case 'd3':
          r = 'Diamond 3'
          break;
        case 'l1':
          r = 'Legend 1'
          break;
        case 'l2':
          r = 'Legend 2'
          break;
        case 'l3':
          r = 'Legend 3'
          break;
        case 'l4':
          r = 'Legend 4'
          break;
        case 'sd1':
          r = 'Star Diamond 1'
          break;
        case 'sd2':
          r = 'Star Diamond 2'
          break;
        case 'sd3':
          r = 'Star Diamond 3'
          break;
        case 'sd4':
          r = 'Star Diamond 4'
          break;
        case 'sd5':
          r = 'Star Diamond 5'
          break;
        default:
          r = 'No rank'
      }
      return r
    }
  }
}
