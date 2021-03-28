<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <button class="accordion">What is Phreezone all about?</button>
        <div class="panel">
          <p>Check <nuxt-link to="/about">About Us</nuxt-link> page to learn more</p>
        </div>
        <button class="accordion">What if I don't bring in people?</button>
        <div class="panel">
          <p>You will be limited to earning of spill over bonus when others joins after you.</p>
        </div>
        <button class="accordion">Where did Phreezone originated from?</button>
        <div class="panel">
          <p>Phreezone originated from oslo  Norway</p>
        </div>
        <button class="accordion">How do I shop for free?</button>
        <div class="panel">
          <p>Just get registered  select a package and become a member you can start shopping for free
            When  you tell others and they join, you get paid and also shop more for free</p>
        </div>
        <button class="accordion">Where will I shop ?</button>
        <div class="panel">
          <p>In any Phreezone shopping outlet around you.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'faq',
    auth: 'guest',
    mounted() {
      var acc = document.getElementsByClassName("accordion");
      var i;

      for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
          this.classList.toggle("active");
          var panel = this.nextElementSibling;
          if (panel.style.display === "block") {
            panel.style.display = "none";
          } else {
            panel.style.display = "block";
          }
        });
      }
    }
  }
</script>

<style scoped>
  .container {
    margin-top: 120px;
  }
  @media (max-width: 767px) {
    .container {
      margin-top: 100px;
      margin-bottom: 70px;
    }
  }
  .accordion {
    background-color: #eee;
    color: #444;
    margin-bottom: 2px;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    text-align: left;
    border: none;
    outline: none;
    transition: 0.4s;
  }

  /* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
  .active, .accordion:hover {
    background-color: #ccc;
  }

  /* Style the accordion panel. Note: hidden by default */
  .panel {
    padding: 0 18px;
    background-color: white;
    display: none;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
  }
  .accordion:after {
    content: '\02795'; /* Unicode character for "plus" sign (+) */
    font-size: 13px;
    color: #777;
    float: right;
    margin-left: 5px;
  }

  .active:after {
    content: "\2796"; /* Unicode character for "minus" sign (-) */
  }
</style>
