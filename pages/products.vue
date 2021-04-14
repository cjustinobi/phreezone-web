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
          <a-table :columns="columns" :data-source="data" :pagination="false" bordered />
          <p style="margin-top: 50px">Between the packages of Treasure Bronze and Silver,  Here are your estimated earnings on performance.</p>
          <a-table :columns="columns1" :data-source="data1" :pagination="false" bordered />
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
        </div>
        <div class="col-lg-6">
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
  export default {
    name: 'Product',
    auth: 'guest',
    data() {
      return {
        data,
        data1,
        columns,
        columns1,
      }
    }
  }
</script>

<style scoped>

</style>
