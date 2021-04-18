<template>
  <section id="about" class="about">
    <div class="container">

      <div class="section-title">
        <!--        <h3>Learn More <span>About Us</span></h3>-->
        <p>
          Phreezone operates a maximum of seven different packages which partners can subscribe with during their
          registration.
        </p>
      </div>

      <div class="row content">
        <div class="col-lg-6">
          <img src="~assets/img/table1.png" alt="phreezone image">
<!--          <a-table :columns="columns" :data-source="data" :pagination="false" bordered />-->
          <p style="margin-top: 50px">Between the packages of Treasure Bronze and Silver,  Here are your estimated earnings on performance.</p>
<!--          <a-table :columns="columns1" :data-source="data1" :pagination="false" bordered />-->
          <img src="~assets/img/table2.png" alt="phreezone image">
          <p style="margin-top: 50px">
            From the packages of: <b>Silver Star</b>
            <b>Gold</b><br>
            <b>Platinum</b> and <br>
            <b>Royal VIP</b><br>

            You earn over 44%.<br>

            Eg: <br>
            For a partner who raised 30points in one or two of his legs, Here are your potential earning.
          </p>
          <img src="~assets/img/calc.png" alt="Phreezone image">
          <p>
            • This is your earnings in each of these legs. <br>
            • Phreezone pays for all the activities in each leg.
          </p>
          <h6>Bonuses</h6>
          <ul>
            <li><i class="ri-check-double-line"></i> PERFORMANCE BONUS</li>
            <li><i class="ri-check-double-line"></i> SHOPPING BONUS</li>
            <li><i class="ri-check-double-line"></i> SPILL OVER BONUS</li>
            <li><i class="ri-check-double-line"></i> ACCUMULATIVE BONUS</li>
            <li><i class="ri-check-double-line"></i> LEADERSHIP BONUS</li>
          </ul>
          <p>
            <b>PERFORMANCE BONUS:</b> This is the major bonus paid out to a partner based on his or her activities.
            There are no limits to the amount of performance bonus which a partner can earn.
          </p>
          <p>
            <b>SHOPPING BONUS:</b>This bonus is calculated base on a percentage from  each point raised.
            Company converts these points and credit it into a partner’s shopping wallet.
            This money is used for partner’s free shopping in all our phreezone shopping malls.
          </p>
          <p>
            <b>SPILL OVER BONUS:</b>10% sharing among all the members within the 1st to the 10th generations
            from all the weekly activities.
            Spill over bonus is earned base on your current package.
          </p>
          <p>
            A partner with  <b>TREASURE PACKAGE</b>, Can only earn spill over from activities of <b>TREASURE PACKAGE</b>
          </p>
          <p>
            A partner with  <b>BRONZE PACKAGE</b>, will earn spill over from the activities of <b>TREASURE AND BRONZE PACKAGE only.</b>
          </p>
          <p>
            A partner with <b>SILVER PACKAGE</b>will earn spill over from the activities of <b>TREASURE, BRONZE and SILVER</b>
          </p>
          <p>
            A partner with <b>SILVER-STAR PACKAGE</b> will earn spill over from
            activities of <b>TREASURE, BRONZE, SILVER</b> and <b>SILVER-STAR</b>.
          </p>
          <p>
            A partner with <b>GOLD PACKAGE</b> will earn spill over from activities of
            <b>TREASURE, BRONZE, SILVER, SILVER- STAR</b>, and <b>GOLD</b>
          </p>
          <p>
            A partner with  <b>PLATINUM PACKAGE</b> will earn spill over from activities of
            <b>TREASURE, BRONZE, SILVER, SILVER-STAR, GOLD</b>, and <b>PLATINUM</b>
          </p>
          <p>
            A partner with <b>VIP ROYAL</b> will earn spill over from activities of
            <b>TREASURE, BRONZE, SILVER, SILVER-STAR, GOLD, PLATINUM</b>, and <b>VIP ROYAL</b>
          </p>
          <p>
            <b>ACCUMULATIVE  BONUS: </b>This is 6% reserved in a partner’s accumulative wallet for every activity
            up to <b>SILVER-STAR</b> to <b>VIP ROYAL</b> This bonus can be cashed out at a partner’s wish.
          </p>
          <img src="~assets/img/table3.png" alt="phreezone image">
          <img src="~assets/img/table4.png" alt="phreezone image">
<!--          <a-table :columns="columns2" :data-source="data2" :pagination="false" bordered />-->
        </div>
        <div class="col-lg-6">


          <h5>Incentives</h5>
          <h6 class="award">Car Awards</h6>
          <img src="~assets/img/car.png" alt="Phreezone"/>
          <h6 class="award">Trip Qualifications</h6>
          <img src="~assets/img/trip.jpg" alt="Phreezone"/>
          <h6 class="award">House Funds</h6>
          <img src="~assets/img/house.jpg" alt="Phreezone">
          <h6 class="award">Scholarships</h6>
          <img src="~assets/img/scholarship.jpg" alt="Phreezone"/>
          <h5>Stockist Incentives</h5>
          <h6 class="award">Cash Awards</h6>
          <img src="~assets/img/cash.jpg" alt="Phreezone">
          <h6 class="award">Free Products Supply</h6>
          <img src="~assets/img/products.jpg" alt="Phreezone"/>
          <h5>Star Director Incentives</h5>
          <h6 class="award">Quarterly Paid Allowances</h6>
          <img src="~assets/img/cash.jpg" alt="Phreezone">
          <h6 class="award">Free Special Treats</h6>
          <img src="~assets/img/treat.jpg" alt="Phreezone"/>
          <img src="~assets/img/treat1.jpg" alt="Phreezone"/>
          <img src="~assets/img/treat3.jpg" alt="Phreezone"/>
          <h6 class="award">All expenses paid trip from time to time</h6>
          <img src="~assets/img/trip.jpg" alt="Phreezone"/>
        </div>

      </div>

    </div>
  </section>
</template>

<script>
  const data = [
    { key: '1', pkg: 'Treasure', points: 1, amount: '5,000' },
    { key: '2', pkg: 'Bronze', points: 3, amount: '15,000' },
    { key: '3', pkg: 'Silver', points: 10, amount: '50,000' },
    { key: '4', pkg: 'Silver Star', points: 30, amount: '150,000' },
    { key: '5', pkg: 'Gold', points: 60, amount: '300,000' },
    { key: '6', pkg: 'Platinum', points: 120, amount: '600,000' },
    { key: '7', pkg: 'VIP Royal', points: 240, amount: '1,200,000' }
  ]
  const data1 = [
    { key: '1', pkg: 'Treasure', points: 1, pb: '1,300', sb: '6%' },
    { key: '2', pkg: 'Bronze', points: 3, pb: '4,000', sb: '6%' },
    { key: '3', pkg: 'Silver', points: 10, pb: '13,000', sb: '6%' }
  ]
  const data2 = [
    { key: '1', rank: 'Diamond 1', pa: '120', req: ''},
    { key: '2', rank: 'Diamond 2', pa: '240', req: ''},
    { key: '3', rank: 'Diamond 3', pa: '740', req: 'Two Diamond 2 in each leg'},
    { key: '4', rank: 'Diamond 4', pa: '2,960', req: 'Two Diamond 3 in each leg'},
    { key: '5', rank: 'Diamond 5', pa: '14,800', req: 'Two Diamond 4 in each leg'},
    { key: '6', rank: 'Diamond 6', pa: '88,800', req: 'Two Diamond 5 in each leg'},
    { key: '7', rank: 'Diamond 7', pa: '621,600', req: 'Two Diamond 6 in each leg'},
    { key: '8', rank: 'Star Director 1', pa: '1,864,800', req: 'Two Diamond 7 in each leg'},
    { key: '9', rank: 'Star Director 2', pa: '5,594,400', req: 'Two Star 2 Directors in each leg'},
    { key: '10', rank: 'Star Director 3', pa: '16,783,200', req: 'Two Star 2 Directors in each leg'},
    { key: '11', rank: 'Star Director 4', pa: '50,349,600', req: 'Two Star 3 Directors in each leg'},
    { key: '12', rank: 'Star Director 5', pa: '151,048,800', req: 'Two Star 4 Directors in each leg'},
  ]
  const columns = [
    {title: 'Packages', dataIndex: 'pkg'},
    {title: 'Points', dataIndex: 'points'},
    {title: 'Amounts (NGN)', dataIndex: 'amount'}
  ]
  const columns1 = [
    {title: 'Packages', dataIndex: 'pkg'},
    {title: 'Points', dataIndex: 'points'},
    {title: 'Performance Bonus', dataIndex: 'pb'},
    {title: 'Shopping Bonus', dataIndex: 'sb'}
  ]
  const columns2 = [
    {title: 'Rank', dataIndex: 'rank'},
    {title: 'Points (Accumulative)', dataIndex: 'pa'},
    {title: 'Requirements', dataIndex: 'req'}
  ]
  export default {
    name: 'Business',
    auth: 'guest',
    data() {
      return {
        data,
        data1,
        data2,
        columns,
        columns1,
        columns2,
      }
    }
  }
</script>

<style scoped>
  h6 {
    margin: 40px 0;
  }
  img {
    width: 100%;
    height: auto;
  }
</style>
