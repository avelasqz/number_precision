//set up the betting feature

var MAX_COINS = 20;

var REPETITIONS = 1;

var first_catch_trial = true;

// set up experiment logic for each slide
function make_slides(f) {
  var slides = {};


  // set up initial slide
  slides.i0 = slide({
    name: "i0",
    start: function() {
      exp.startT = Date.now();
    }
  });







  // set up instructions slide
  slides.instructions = slide({
    name: "instructions",
    button: function() {
      exp.go();
    }
  });









  slides.trial = slide({
    name: "trial",

    present: exp.stimuli,
    present_handle : function(stim) {
      exp.startTrial = Date.now();
      $(".coin").attr("src", "./images/coins_0.png");
      $("#trial_continue_button").attr("disabled", "disabled");
      $("#c_coin-1").attr("src", "./images/c_count0.png");
      $("#c_coin-2").attr("src", "./images/c_count0.png");
      $("#c_coin-3").attr("src", "./images/c_count0.png");
      $("#c_coin-4").attr("src", "./images/c_count0.png");
      $("#c_coin-5").attr("src", "./images/c_count0.png");
      $("#c_coin-6").attr("src", "./images/c_count0.png");
      $("#c_coin-7").attr("src", "./images/c_count0.png");
      $("#c_coin-8").attr("src", "./images/c_count0.png");
      $("#c_coin-9").attr("src", "./images/c_count0.png");
      $("#c_coin-10").attr("src", "./images/c_count0.png");
      $("#c_coin-11").attr("src", "./images/c_count0.png");

      $(".err").hide();
      $('.prompt').hide();
      $('.context').hide();
      $('.answer').hide();
      $('.question').hide();
      $('.bet_prompt').hide();
      $('#coinfunction').hide();
      $('#available-coins').hide();
      $('#trial_continue_button').hide();
      $('.button').hide();
      $('.coinfunction').val("");

      exp.response = null

      exp.trial_number += 1

      exp.coin1 = 0;
      exp.coin2 = 0;
      exp.coin3 = 0;
      exp.coin4 = 0;
      exp.coin5 = 0;
      exp.coin6 = 0;
      exp.coin7 = 0;
      exp.coin8 = 0;
      exp.coin9 = 0;
      exp.coin10 = 0;
      exp.coin11 = 0;
      exp.betcoins = 0;
      exp.remaincoins = 20;
      
      console.log("coin values:", exp.coin1, exp.coin2, exp.coin3, exp.coin4, exp.coin5, exp.coin6, exp.coin7, exp.coin8, exp.coin9, exp.coin10, exp.coin11)

      // store stimulus data
      this.stim = stim;

      exp.item = stim.item;
      $(".item").html(exp.item);
      console.log("item:", exp.item);

      if (exp.item.includes("high")) {
        exp.stakes = "high"
      } else if (exp.item.includes("low")) {
        exp.stakes = "low"
      } else {
        exp.stakes = "agnostic"
      };
      console.log("stakes:", exp.stakes)

      if (exp.item.includes("nb")) {
        exp.bound = "none"
      } else if (exp.item.includes("ub")) {
        exp.bound = "upper"
      } else {
        exp.bound = "lower"
      };
      console.log("bound:", exp.bound)

      exp.current_number = exp.numbers.shift();
      console.log("limit number:", exp.current_number);

      if (exp.item == 'gamenight_agn_ub') {
        exp.bold_sent = 'They need NUMLIMIT residents or less.';
        exp.context = stim.context.replace(exp.bold_sent, '<b>' + exp.bold_sent + '</b>');
        $(".context").html(exp.context);
      } else if (exp.item == 'gamenight_agn_lb') {
        exp.bold_sent = 'They need NUMLIMIT residents or more.';
        exp.context = stim.context.replace(exp.bold_sent, '<b>' + exp.bold_sent + '</b>');
        $(".context").html(exp.context);
      } else if (exp.item == 'trivianight_agn_ub') {
        exp.bold_sent = 'They need NUMLIMIT residents or less.';
        exp.context = stim.context.replace(exp.bold_sent, '<b>' + exp.bold_sent + '</b>');
        $(".context").html(exp.context);
      } else if (exp.item == 'trivianight_agn_lb') {
        exp.bold_sent = 'They need NUMLIMIT residents or more.';
        exp.context = stim.context.replace(exp.bold_sent, '<b>' + exp.bold_sent + '</b>');
        $(".context").html(exp.context);
      } else if (exp.item == 'extras_agn_ub') {
        exp.bold_sent = 'They need NUMLIMIT extras or less.';
        exp.context = stim.context.replace(exp.bold_sent, '<b>' + exp.bold_sent + '</b>');
        $(".context").html(exp.context);
      } else if (exp.item == 'extras_agn_lb') {
        exp.bold_sent = 'They need NUMLIMIT extras or more.';
        exp.context = stim.context.replace(exp.bold_sent, '<b>' + exp.bold_sent + '</b>');
        $(".context").html(exp.context);
      } else if (exp.item == 'chorus_agn_ub') {
        exp.bold_sent = 'They need NUMLIMIT students or less.';
        exp.context = stim.context.replace(exp.bold_sent, '<b>' + exp.bold_sent + '</b>');
        $(".context").html(exp.context);
      } else {
        exp.bold_sent = 'They need NUMLIMIT students or more.';
        exp.context = stim.context.replace(exp.bold_sent, '<b>' + exp.bold_sent + '</b>');
        $(".context").html(exp.context);
      }

      exp.context = exp.context.replace("NUMLIMIT", exp.current_number);
      $(".context").html(exp.context);
      //console.log("context:", exp.context);

      exp.current_utt = exp.utts.shift();
      console.log("utterance number:", exp.current_utt);

      exp.answer = stim.answer.replace("NUMBERUTT", exp.current_utt);
      $(".answer").html(exp.answer);
      //console.log("answer:", exp.answer);


      exp.prompt = '<b>' + stim.bet_prompt + '</b>';
      $('.bet_prompt').html(exp.prompt);
      //console.log("prompt:", exp.prompt);



      if(exp.item.includes("trivia")) {
        exp.correct_answer = "a dorm"
      } else if(exp.item.includes("gamenight")) {
        exp.correct_answer = "a senior center"
      } else if(exp.item.includes("extras")) {
        exp.correct_answer = "a film set"
      } else {
        exp.correct_answer = "a high school"
      }
      //console.log("correct answer:", exp.correct_answer)
      

      // $('.prompt').show();
      // $('.context').show();
      // setTimeout(function() {
      //   $('.answer').show();
      //   setTimeout(function() {
      //    $('.question').show();
      //    $('#coinfunction').show();
      //    $('#available-coins').show();
      //    $('#trial_continue_button').show();
      //    $('.button').show();
      //  }, 1000)
      //  }, 10000)

      $('.prompt').show();
      $('.context').show();
      $('.answer').show();

    },

    button_minus1: function(response) {
      if(exp.coin1 > 0) {
        exp.coin1 -= 1
        console.log("coin1 value:", exp.coin1)
        img = './images/coins_' + exp.coin1 + '.png';
        console.log("image_now:", img)
        $('#coins-1').attr('src', img)
        exp.betcoins -= 1
        console.log("betcoins_now:", exp.betcoins)
        exp.remaincoins += 1
        console.log("remaining_now:", exp.remaincoins)
        avlblimg = './images/coins_' + exp.remaincoins + '.png';
        $('#avail-coins-img').attr('src', avlblimg)
        if(exp.remaincoins > 0) {
        $("#trial_continue_button").attr("disabled", "disabled");
        } else {
        $("#trial_continue_button").attr("disabled", null);
      };
      }
      c_coin1_img = './images/c_count' + exp.coin1 + '.png';
      $("#c_coin-1").attr("src", c_coin1_img);
    },

    button_plus1: function(response) {
      if(exp.betcoins <20 && exp.coin1 < 20) {
        exp.coin1 += 1
        console.log("coin1 value:", exp.coin1)
        img = './images/coins_' + exp.coin1 + '.png';
        console.log("image_now:", img)
        $('#coins-1').attr('src', img)
        exp.betcoins += 1
        console.log("betcoins_now:", exp.betcoins)
        exp.remaincoins -= 1
        console.log("remaining_now:", exp.remaincoins)
        avlblimg = './images/coins_' + exp.remaincoins + '.png';
        $('#avail-coins-img').attr('src', avlblimg);
        if(exp.remaincoins > 0) {
        $("#trial_continue_button").attr("disabled", "disabled");
        } else {
        $("#trial_continue_button").attr("disabled", null);
      };
      };
      c_coin1_img = './images/c_count' + exp.coin1 + '.png';
      $("#c_coin-1").attr("src", c_coin1_img);
    },

    button_minus2: function(response) {
      if(exp.coin2 > 0) {
        exp.coin2 -= 1
        console.log("coin2 value:", exp.coin2)
        img = 'images/coins_' + exp.coin2 + '.png';
        console.log("image_now:", img)
        $('#coins-2').attr('src', img)
        exp.betcoins -= 1
        console.log("betcoins_now:", exp.betcoins)
        exp.remaincoins += 1
        console.log("remaining_now:", exp.remaincoins)
        avlblimg = './images/coins_' + exp.remaincoins + '.png';
        $('#avail-coins-img').attr('src', avlblimg)
        if(exp.remaincoins > 0) {
        $("#trial_continue_button").attr("disabled", "disabled");
        } else {
        $("#trial_continue_button").attr("disabled", null);
      };
      }
      c_coin2_img = './images/c_count' + exp.coin2 + '.png';
      $("#c_coin-2").attr("src", c_coin2_img);
    },

    button_plus2: function(response) {
      if(exp.betcoins <20 && exp.coin2 < 20) {
        exp.coin2 += 1
        console.log("coin2 value:", exp.coin2)
        img = 'images/coins_' + exp.coin2 + '.png';
        console.log("image_now:", img)
        $('#coins-2').attr('src', img)
        exp.betcoins += 1
        console.log("betcoins_now:", exp.betcoins)
        exp.remaincoins -= 1
        console.log("remaining_now:", exp.remaincoins)
        avlblimg = './images/coins_' + exp.remaincoins + '.png';
        $('#avail-coins-img').attr('src', avlblimg)
        if(exp.remaincoins > 0) {
        $("#trial_continue_button").attr("disabled", "disabled");
        } else {
        $("#trial_continue_button").attr("disabled", null);
      };
      }
      c_coin2_img = './images/c_count' + exp.coin2 + '.png';
      $("#c_coin-2").attr("src", c_coin2_img);
    },

    button_minus3: function(response) {
      if(exp.coin3 > 0) {
        exp.coin3 -= 1
        console.log("coin3 value:", exp.coin3)
        img = 'images/coins_' + exp.coin3 + '.png';
        console.log("image_now:", img)
        $('#coins-3').attr('src', img)
        exp.betcoins -= 1
        console.log("betcoins_now:", exp.betcoins)
        exp.remaincoins += 1
        console.log("remaining_now:", exp.remaincoins)
        avlblimg = './images/coins_' + exp.remaincoins + '.png';
        $('#avail-coins-img').attr('src', avlblimg)
        if(exp.remaincoins > 0) {
        $("#trial_continue_button").attr("disabled", "disabled");
        } else {
        $("#trial_continue_button").attr("disabled", null);
      };
      }
      c_coin3_img = './images/c_count' + exp.coin3 + '.png';
      $("#c_coin-3").attr("src", c_coin3_img);
    },

    button_plus3: function(response) {
      if(exp.betcoins <20 && exp.coin3 < 20) {
        exp.coin3 += 1
        console.log("coin3 value:", exp.coin3)
        img = 'images/coins_' + exp.coin3 + '.png';
        console.log("image_now:", img)
        $('#coins-3').attr('src', img)
        exp.betcoins += 1
        console.log("betcoins_now:", exp.betcoins)
        exp.remaincoins -= 1
        console.log("remaining_now:", exp.remaincoins)
        avlblimg = './images/coins_' + exp.remaincoins + '.png';
        $('#avail-coins-img').attr('src', avlblimg)
        if(exp.remaincoins > 0) {
        $("#trial_continue_button").attr("disabled", "disabled");
        } else {
        $("#trial_continue_button").attr("disabled", null);
      };
      }
      c_coin3_img = './images/c_count' + exp.coin3 + '.png';
      $("#c_coin-3").attr("src", c_coin3_img);
    },

    button_minus4: function(response) {
      if(exp.coin4 > 0) {
        exp.coin4 -= 1
        console.log("coin1 value:", exp.coin4)
        img = 'images/coins_' + exp.coin4 + '.png';
        console.log("image_now:", img)
        $('#coins-4').attr('src', img)
        exp.betcoins -= 1
        console.log("betcoins_now:", exp.betcoins)
        exp.remaincoins += 1
        console.log("remaining_now:", exp.remaincoins)
        avlblimg = './images/coins_' + exp.remaincoins + '.png';
        $('#avail-coins-img').attr('src', avlblimg)
        if(exp.remaincoins > 0) {
        $("#trial_continue_button").attr("disabled", "disabled");
        } else {
        $("#trial_continue_button").attr("disabled", null);
      };
      }
      c_coin4_img = './images/c_count' + exp.coin4 + '.png';
      $("#c_coin-4").attr("src", c_coin4_img);
    },

    button_plus4: function(response) {
      if(exp.betcoins <20 && exp.coin4 < 20) {
        exp.coin4 += 1
        console.log("coin4 value:", exp.coin4)
        img = 'images/coins_' + exp.coin4 + '.png';
        console.log("image_now:", img)
        $('#coins-4').attr('src', img)
        exp.betcoins += 1
        console.log("betcoins_now:", exp.betcoins)
        exp.remaincoins -= 1
        console.log("remaining_now:", exp.remaincoins)
        avlblimg = './images/coins_' + exp.remaincoins + '.png';
        $('#avail-coins-img').attr('src', avlblimg)
        if(exp.remaincoins > 0) {
        $("#trial_continue_button").attr("disabled", "disabled");
        } else {
        $("#trial_continue_button").attr("disabled", null);
      };
      }
      c_coin4_img = './images/c_count' + exp.coin4 + '.png';
      $("#c_coin-4").attr("src", c_coin4_img);
    },

    button_minus5: function(response) {
      if(exp.coin5 > 0) {
        exp.coin5 -= 1
        console.log("coin1 value:", exp.coin5)
        img = 'images/coins_' + exp.coin5 + '.png';
        console.log("image_now:", img)
        $('#coins-5').attr('src', img)
        exp.betcoins -= 1
        console.log("betcoins_now:", exp.betcoins)
        exp.remaincoins += 1
        console.log("remaining_now:", exp.remaincoins)
        avlblimg = './images/coins_' + exp.remaincoins + '.png';
        $('#avail-coins-img').attr('src', avlblimg)
        if(exp.remaincoins > 0) {
        $("#trial_continue_button").attr("disabled", "disabled");
        } else {
        $("#trial_continue_button").attr("disabled", null);
      };
      }
      c_coin5_img = './images/c_count' + exp.coin5 + '.png';
      $("#c_coin-5").attr("src", c_coin5_img);
    },

    button_plus5: function(response) {
      if(exp.betcoins <20 && exp.coin5 < 20) {
        exp.coin5 += 1
        console.log("coin5 value:", exp.coin5)
        img = 'images/coins_' + exp.coin5 + '.png';
        console.log("image_now:", img)
        $('#coins-5').attr('src', img)
        exp.betcoins += 1
        console.log("betcoins_now:", exp.betcoins)
        exp.remaincoins -= 1
        console.log("remaining_now:", exp.remaincoins)
        avlblimg = './images/coins_' + exp.remaincoins + '.png';
        $('#avail-coins-img').attr('src', avlblimg)
        if(exp.remaincoins > 0) {
        $("#trial_continue_button").attr("disabled", "disabled");
        } else {
        $("#trial_continue_button").attr("disabled", null);
      };
      }
      c_coin5_img = './images/c_count' + exp.coin5 + '.png';
      $("#c_coin-5").attr("src", c_coin5_img);
    },

    button_minus6: function(response) {
      if(exp.coin6 > 0) {
        exp.coin6 -= 1
        console.log("coin6 value:", exp.coin6)
        img = 'images/coins_' + exp.coin6 + '.png';
        console.log("image_now:", img)
        $('#coins-6').attr('src', img)
        exp.betcoins -= 1
        console.log("betcoins_now:", exp.betcoins)
        exp.remaincoins += 1
        console.log("remaining_now:", exp.remaincoins)
        avlblimg = './images/coins_' + exp.remaincoins + '.png';
        $('#avail-coins-img').attr('src', avlblimg)
        if(exp.remaincoins > 0) {
        $("#trial_continue_button").attr("disabled", "disabled");
        } else {
        $("#trial_continue_button").attr("disabled", null);
      };
      }
      c_coin6_img = './images/c_count' + exp.coin6 + '.png';
      $("#c_coin-6").attr("src", c_coin6_img);
    },

    button_plus6: function(response) {
      if(exp.betcoins <20 && exp.coin6 < 20) {
        exp.coin6 += 1
        console.log("coin6 value:", exp.coin6)
        img = 'images/coins_' + exp.coin6 + '.png';
        console.log("image_now:", img)
        $('#coins-6').attr('src', img)
        exp.betcoins += 1
        console.log("betcoins_now:", exp.betcoins)
        exp.remaincoins -= 1
        console.log("remaining_now:", exp.remaincoins)
        avlblimg = './images/coins_' + exp.remaincoins + '.png';
        $('#avail-coins-img').attr('src', avlblimg)
        if(exp.remaincoins > 0) {
        $("#trial_continue_button").attr("disabled", "disabled");
        } else {
        $("#trial_continue_button").attr("disabled", null);
      };
      }
      c_coin6_img = './images/c_count' + exp.coin6 + '.png';
      $("#c_coin-6").attr("src", c_coin6_img);
    },

    button_minus7: function(response) {
      if(exp.coin7 > 0) {
        exp.coin7 -= 1
        console.log("coin7 value:", exp.coin7)
        img = 'images/coins_' + exp.coin7 + '.png';
        console.log("image_now:", img)
        $('#coins-7').attr('src', img)
        exp.betcoins -= 1
        console.log("betcoins_now:", exp.betcoins)
        exp.remaincoins += 1
        console.log("remaining_now:", exp.remaincoins)
        avlblimg = './images/coins_' + exp.remaincoins + '.png';
        $('#avail-coins-img').attr('src', avlblimg)
        if(exp.remaincoins > 0) {
        $("#trial_continue_button").attr("disabled", "disabled");
        } else {
        $("#trial_continue_button").attr("disabled", null);
        }
      }
      c_coin7_img = './images/c_count' + exp.coin7 + '.png';
      $("#c_coin-7").attr("src", c_coin7_img);
    },

    button_plus7: function(response) {
      if(exp.betcoins <20 && exp.coin7 < 20) {
        exp.coin7 += 1
        console.log("coin1 value:", exp.coin7)
        img = 'images/coins_' + exp.coin7 + '.png';
        console.log("image_now:", img)
        $('#coins-7').attr('src', img)
        exp.betcoins += 1
        console.log("betcoins_now:", exp.betcoins)
        exp.remaincoins -= 1
        console.log("remaining_now:", exp.remaincoins)
        avlblimg = './images/coins_' + exp.remaincoins + '.png';
        $('#avail-coins-img').attr('src', avlblimg)
        if(exp.remaincoins > 0) {
        $("#trial_continue_button").attr("disabled", "disabled");
        } else {
        $("#trial_continue_button").attr("disabled", null);
        }
      }
      c_coin7_img = './images/c_count' + exp.coin7 + '.png';
      $("#c_coin-7").attr("src", c_coin7_img);
    },

    button_minus8: function(response) {
      if(exp.coin8 > 0) {
        exp.coin8 -= 1
        console.log("coin8 value:", exp.coin8)
        img = 'images/coins_' + exp.coin8 + '.png';
        console.log("image_now:", img)
        $('#coins-8').attr('src', img)
        exp.betcoins -= 1
        console.log("betcoins_now:", exp.betcoins)
        exp.remaincoins += 1
        console.log("remaining_now:", exp.remaincoins)
        avlblimg = './images/coins_' + exp.remaincoins + '.png';
        $('#avail-coins-img').attr('src', avlblimg)
        if(exp.remaincoins > 0) {
        $("#trial_continue_button").attr("disabled", "disabled");
        } else {
        $("#trial_continue_button").attr("disabled", null);
        }
      }
      c_coin8_img = './images/c_count' + exp.coin8 + '.png';
      $("#c_coin-8").attr("src", c_coin8_img);
    },

    button_plus8: function(response) {
      if(exp.betcoins <20 && exp.coin8 < 20) {
        exp.coin8 += 1
        console.log("coin8 value:", exp.coin8)
        img = 'images/coins_' + exp.coin8 + '.png';
        console.log("image_now:", img)
        $('#coins-8').attr('src', img)
        exp.betcoins += 1
        console.log("betcoins_now:", exp.betcoins)
        exp.remaincoins -= 1
        console.log("remaining_now:", exp.remaincoins)
        avlblimg = './images/coins_' + exp.remaincoins + '.png';
        $('#avail-coins-img').attr('src', avlblimg)
        if(exp.remaincoins > 0) {
        $("#trial_continue_button").attr("disabled", "disabled");
        } else {
        $("#trial_continue_button").attr("disabled", null);
        }
      }
      c_coin8_img = './images/c_count' + exp.coin8 + '.png';
      $("#c_coin-8").attr("src", c_coin8_img);
    },

    button_minus9: function(response) {
      if(exp.coin9 > 0) {
        exp.coin9 -= 1
        console.log("coin9 value:", exp.coin9)
        img = 'images/coins_' + exp.coin9 + '.png';
        console.log("image_now:", img)
        $('#coins-9').attr('src', img)
        exp.betcoins -= 1
        console.log("betcoins_now:", exp.betcoins)
        exp.remaincoins += 1
        console.log("remaining_now:", exp.remaincoins)
        avlblimg = './images/coins_' + exp.remaincoins + '.png';
        $('#avail-coins-img').attr('src', avlblimg)
        if(exp.remaincoins > 0) {
        $("#trial_continue_button").attr("disabled", "disabled");
        } else {
        $("#trial_continue_button").attr("disabled", null);
        }
      }
      c_coin9_img = './images/c_count' + exp.coin9 + '.png';
      $("#c_coin-9").attr("src", c_coin9_img);
    },

    button_plus9: function(response) {
      if(exp.betcoins <20 && exp.coin9 < 20) {
        exp.coin9 += 1
        console.log("coin9 value:", exp.coin9)
        img = 'images/coins_' + exp.coin9 + '.png';
        console.log("image_now:", img)
        $('#coins-9').attr('src', img)
        exp.betcoins += 1
        console.log("betcoins_now:", exp.betcoins)
        exp.remaincoins -= 1
        console.log("remaining_now:", exp.remaincoins)
        avlblimg = './images/coins_' + exp.remaincoins + '.png';
        $('#avail-coins-img').attr('src', avlblimg)
        if(exp.remaincoins > 0) {
        $("#trial_continue_button").attr("disabled", "disabled");
        } else {
        $("#trial_continue_button").attr("disabled", null);
        }
      }
      c_coin9_img = './images/c_count' + exp.coin9 + '.png';
      $("#c_coin-9").attr("src", c_coin9_img);
    },

    button_minus10: function(response) {
      if(exp.coin10 > 0) {
        exp.coin10 -= 1
        console.log("coin10 value:", exp.coin10)
        img = 'images/coins_' + exp.coin10 + '.png';
        console.log("image_now:", img)
        $('#coins-10').attr('src', img)
        exp.betcoins -= 1
        console.log("betcoins_now:", exp.betcoins)
        exp.remaincoins += 1
        console.log("remaining_now:", exp.remaincoins)
        avlblimg = './images/coins_' + exp.remaincoins + '.png';
        $('#avail-coins-img').attr('src', avlblimg)
        if(exp.remaincoins > 0) {
        $("#trial_continue_button").attr("disabled", "disabled");
        } else {
        $("#trial_continue_button").attr("disabled", null);
        }
      }
      c_coin10_img = './images/c_count' + exp.coin10 + '.png';
      $("#c_coin-10").attr("src", c_coin10_img);
    },

    button_plus10: function(response) {
      if(exp.betcoins <20 && exp.coin10 < 20) {
        exp.coin10 += 1
        console.log("coin10 value:", exp.coin10)
        img = 'images/coins_' + exp.coin10 + '.png';
        console.log("image_now:", img)
        $('#coins-10').attr('src', img)
        exp.betcoins += 1
        console.log("betcoins_now:", exp.betcoins)
        exp.remaincoins -= 1
        console.log("remaining_now:", exp.remaincoins)
        avlblimg = './images/coins_' + exp.remaincoins + '.png';
        $('#avail-coins-img').attr('src', avlblimg)
        if(exp.remaincoins > 0) {
        $("#trial_continue_button").attr("disabled", "disabled");
        } else {
        $("#trial_continue_button").attr("disabled", null);
        }
      }
      c_coin10_img = './images/c_count' + exp.coin10 + '.png';
      $("#c_coin-10").attr("src", c_coin10_img);
    },

    button_minus11: function(response) {
      if(exp.coin11 > 0) {
        exp.coin11 -= 1
        console.log("coin11 value:", exp.coin11)
        img = 'images/coins_' + exp.coin11 + '.png';
        console.log("image_now:", img)
        $('#coins-11').attr('src', img)
        exp.betcoins -= 1
        console.log("betcoins_now:", exp.betcoins)
        exp.remaincoins += 1
        console.log("remaining_now:", exp.remaincoins)
        avlblimg = './images/coins_' + exp.remaincoins + '.png';
        $('#avail-coins-img').attr('src', avlblimg)
        if(exp.remaincoins > 0) {
        $("#trial_continue_button").attr("disabled", "disabled");
        } else {
        $("#trial_continue_button").attr("disabled", null);
        }
      }
      c_coin11_img = './images/c_count' + exp.coin11 + '.png';
      $("#c_coin-11").attr("src", c_coin11_img);
    },

    button_plus11: function(response) {
      if(exp.betcoins <20 && exp.coin11 < 20) {
        exp.coin11 += 1
        console.log("coin11 value:", exp.coin11)
        img = 'images/coins_' + exp.coin11 + '.png';
        console.log("image_now:", img)
        $('#coins-11').attr('src', img)
        exp.betcoins += 1
        console.log("betcoins_now:", exp.betcoins)
        exp.remaincoins -= 1
        console.log("remaining_now:", exp.remaincoins)
        avlblimg = './images/coins_' + exp.remaincoins + '.png';
        $('#avail-coins-img').attr('src', avlblimg)
        if(exp.remaincoins > 0) {
        $("#trial_continue_button").attr("disabled", "disabled");
        } else {
        $("#trial_continue_button").attr("disabled", null);
        }
      }
      c_coin11_img = './images/c_count' + exp.coin11 + '.png';
      $("#c_coin-11").attr("src", c_coin11_img);
    },

    button_coins: function() {
      exp.clickCoins = Date.now();
      $('.question').show();
      $('.bet_prompt').show();
      $('#coinfunction').show();
      $('#available-coins').show();
      $('#trial_continue_button').show();
      $('.button').show();
    },

    button_trial: function() {
      exp.endTrial = Date.now();
      this.log_responses();
      _stream.apply(this);
    },

    log_responses: function () {
        exp.data_trials.push({
          "trial_number": exp.trial_number,
          "item": this.stim.item,
          "stakes": exp.stakes,
          "bound": exp.bound,
          "answer_number": exp.current_number,
          "coin_a": exp.coin1,
          "coin_b": exp.coin2,
          "coin_c": exp.coin3,
          "coin_d": exp.coin4,
          "coin_e": exp.coin5,
          "coin_f": exp.coin6,
          "coin_g": exp.coin7,
          "coin_h": exp.coin8,
          "coin_i": exp.coin9,
          "coin_j": exp.coin10,
          "coin_k": exp.coin11,
          "read_time_minutes": (exp.clickCoins - exp.startTrial) / 60000,
          "trial_time_minutes": (exp.endTrial - exp.startTrial) / 60000
        })
    }


    

  });








// attention check slide
  slides.attention_check = slide({
    name: "attention_check",

    // present: exp.check,
    start : function(loc) {
      this.loc = loc
      //console.log("check option order:", exp.check);
      // exp.option1 == exp.check.shift();
      // $('#op1').attr('value', exp.option1)
      document.getElementById('op1').textContent = exp.check.pop();
      document.getElementById('op2').textContent = exp.check.pop();
      document.getElementById('op3').textContent = exp.check.pop();
      document.getElementById('op4').textContent = exp.check.pop();
      document.getElementById('op5').textContent = exp.check.pop();
      document.getElementById('op6').textContent = exp.check.pop();
      document.getElementById('op7').textContent = exp.check.pop();
      document.getElementById('op8').textContent = exp.check.pop();
      document.getElementById('op9').textContent = exp.check.pop();
      document.getElementById('op10').textContent = exp.check[0]
    },

    button_check: function() {
      var checkedText= document.getElementById('check_answer');
      var value = checkedText.options[checkedText.selectedIndex].value;
      var text = checkedText.options[checkedText.selectedIndex].text;
      console.log('Test:', text);
      this.log_responses(text);
      exp.go();
    },

    log_responses: function(text) {
      //exp.check_answer.push({
      //exp.data_trials.push({
        //"check_answer": text,
        //"check_check": exp.correct_answer == text
      //})
      exp.check_answer = {
        "check_answer": text,
        "check_check": exp.correct_answer == text
      }
    }
  });










  // slide to collect subject information
  slides.subj_info = slide({
    name: "subj_info",
    submit: function(e) {
      exp.subj_data = {
        language: $("#language").val(),
        enjoyment: $("#enjoyment").val(),
        asses: $('input[name="assess"]:checked').val(),
        age: $("#age").val(),
        gender: $("#gender").val(),
        education: $("#education").val(),
        fairprice: $("#fairprice").val(),
        comments: $("#comments").val()
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });






  // 
  slides.thanks = slide({
    name: "thanks",
    start: function() {
      exp.data = {
        "trials": exp.data_trials,
        "catch_trials": exp.catch_trials,
        "system": exp.system,
        "attention_check": exp.check_answer,
        "subject_information": exp.subj_data,
        "time_in_minutes": (Date.now() - exp.startT) / 60000
      };
      proliferate.submit(exp.data);
    }
  });

  return slides;
}







/// initialize experiment
function init() {
  exp.trials = [];
  exp.catch_trials = [];
  


  exp.stims = _.shuffle(["gamenight_agn_ub", "gamenight_agn_lb", "trivianight_agn_ub", "trivianight_agn_lb", "extras_agn_ub", "extras_agn_lb", "chorus_agn_ub", "chorus_agn_lb"])

  exp.stim_label = exp.stims.shift();
  console.log("context:", exp.stim_label)

  exp.stim = all_stims.find(stim => stim.item == exp.stim_label)
  //console.log("stim:", exp.stim)

// on this array method and others: https://www.digitalocean.com/community/tutorials/js-array-search-methods

  exp.current_stim = [];
  exp.current_stim.push(exp.stim);


  exp.stimuli = exp.current_stim;





  exp.n_trials = exp.stimuli.length;



  // exp.persona = _.sample(["n", "o"]); //can randomize between subjects conditions here
  // console.log("persona:", exp.persona)


  // exp.condition = _.shuffle(["m","m","m","m","m","m","mm","mm","mm","mm","mm","mm","nm","nm","nm","nm","nm","nm","nnm","nnm","nnm","nnm","nnm","nnm"])
  // console.log("condition:", exp.condition)

  exp.numbers = _.shuffle(["twenty-five"])
  console.log("num_order:", exp.numbers)

  exp.utts = _.shuffle(["twenty-five"])
  console.log("utt_order:", exp.utts)

  exp.check = _.shuffle(["a high school", "a restaurant", "a park", "a dorm", "a bookstore", "a senior center", "a gym", "a sports field", "a museum", "a film set"])
  
  exp.trial_number = 0

  exp.crit_trial_number_count = 0

  exp.fill_trial_number_count = 0

  exp.system = {
    Browser: BrowserDetect.browser,
    OS: BrowserDetect.OS,
    screenH: screen.height,
    screenUH: exp.height,
    screenW: screen.width,
    screenUW: exp.width
  };

  //blocks of the experiment:
  exp.structure = [
    "i0",
    "instructions",
    "trial",
    "attention_check",
    "subj_info",
    "thanks"
  ];

  exp.data_trials = [];

  //exp.check_answer = [];

  //make corresponding slides:
  exp.slides = make_slides(exp);

  // exp.nQs = utils.get_exp_length();
  //this does not work if there are stacks of stims (but does work for an experiment with this structure)
  //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  $("#start_button").click(function() {
    exp.go();
  });

  exp.go(); //show first slide
}

//Some resources used for coding this experiment:
//https://stackoverflow.com/questions/46452820/randomise-part-of-select-dropdown-list
//https://stackoverflow.com/questions/13831601/disabling-and-enabling-a-html-input-button
//https://stackoverflow.com/questions/38060349/replace-image-by-javascript
//https://stackhowto.com/how-to-get-the-text-of-html-element-in-javascript/#:~:text=How%20to%20get%20the%20text%20of%20HTML%20element,%3D%20document.getElementById%28%27myDiv%27%29.textContent%3B%207%20alert%28text%29%3B%208%20%3C%2Fscript%3E%20More%20items
//https://stackoverflow.com/questions/1085801/get-selected-value-in-dropdown-list-using-javascript
//https://stackoverflow.com/questions/29896907/bold-part-of-string