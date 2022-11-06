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
      $('.prompt').hide();
      $('.context').hide();
      $('.question').hide();
      $('.prompt1').hide();
      $('#importance').hide();
      $('.button').hide();
      $('.tickmarks').hide();
      $('#import').hide();
      $('#importance').val("");

      exp.response = null

      exp.trial_number += 1

      // store stimulus data
      this.stim = stim;

      exp.item = stim.item;
      $(".item").html(exp.item);
      console.log("item:", exp.item);

      if (exp.item.includes("high")) {
        exp.stakes = "high"
      } else {
        exp.stakes = "low"
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

      exp.context = stim.context.replace("numlimit", exp.current_number);
      $(".context").html(exp.context);
      console.log("context:", exp.context);

      exp.question = stim.question
      $(".question").html(exp.question);
      console.log("question:", exp.question);

      var rangeslider_import = document.getElementById("importance");
      exp.output_import = document.getElementById("import");
      exp.output_import.innerHTML = rangeslider_import.value;

      rangeslider_import.oninput = function() {
        exp.output_import.innerHTML = this.value;
      }


      

      $('.prompt').show();
      $('.context').show();
      setTimeout(function() {
        $('.question').show();
        setTimeout(function() {
         $('.tickmarks').show();
         $('#importance').show();
         setTimeout(function() {
          $('.button').show();
         }, 6000)
       }, 1000)
       }, 10000)
      

    },

    button: function() {
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
        "current_number": exp.current_number,
        "importance": exp.output_import.innerHTML,

        "trial_time_minutes": (exp.endTrial - exp.startTrial) / 60000
      })
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
        "personae": exp.persona,
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
  


  exp.sets = _.shuffle(["picnic", "dinner_out", "hiking", "family_reunion", "catering", "dinner_in", "security", "conference", "game_night", "board_meeting"])
  console.log("context_order:", exp.sets);

  exp.cats = _.shuffle(["low_nb", "high_nb", "low_ub", "high_ub", "low_lb", "high_lb"])
  console.log("category order:", exp.cats);


  exp.item1 = exp.sets.shift() + '_' + exp.cats.shift();
  exp.item2 = exp.sets.shift() + '_' + exp.cats.shift();
  exp.item3 = exp.sets.shift() + '_' + exp.cats.shift();
  exp.item4 = exp.sets.shift() + '_' + exp.cats.shift();
  exp.item5 = exp.sets.shift() + '_' + exp.cats.shift();
  exp.item6 = exp.sets.shift() + '_' + exp.cats.shift();
  exp.items = [];
  exp.items.push(exp.item1);
  exp.items.push(exp.item2);
  exp.items.push(exp.item3);
  exp.items.push(exp.item4);
  exp.items.push(exp.item5);
  exp.items.push(exp.item6);
  console.log("item_order:", exp.items)

  exp.stim1 = all_stims.find(stim => stim.item == exp.item1)
  console.log("stim1:", exp.stim1)
  exp.stim2 = all_stims.find(stim => stim.item == exp.item2)
  console.log("stim2:", exp.stim2)
  exp.stim3 = all_stims.find(stim => stim.item == exp.item3)
  console.log("stim3:", exp.stim3)
  exp.stim4 = all_stims.find(stim => stim.item == exp.item4)
  console.log("stim4:", exp.stim4)
  exp.stim5 = all_stims.find(stim => stim.item == exp.item5)
  console.log("stim5:", exp.stim5)
  exp.stim6 = all_stims.find(stim => stim.item == exp.item6)
  console.log("stim6:", exp.stim6)

// on this array method and others: https://www.digitalocean.com/community/tutorials/js-array-search-methods

  exp.stims = [];
  exp.stims.push(exp.stim1);
  exp.stims.push(exp.stim2);
  exp.stims.push(exp.stim3);
  exp.stims.push(exp.stim4);
  exp.stims.push(exp.stim5);
  exp.stims.push(exp.stim6);
  console.log("stim_order:", exp.stims)



  exp.stimuli = exp.stims;





  exp.n_trials = exp.stimuli.length;



  // exp.persona = _.sample(["n", "o"]); //can randomize between subjects conditions here
  // console.log("persona:", exp.persona)


  // exp.condition = _.shuffle(["m","m","m","m","m","m","mm","mm","mm","mm","mm","mm","nm","nm","nm","nm","nm","nm","nnm","nnm","nnm","nnm","nnm","nnm"])
  // console.log("condition:", exp.condition)

  exp.numbers = _.shuffle(["20", "30", "40", "60", "70", "80"])
  console.log("num_order:", exp.numbers)


  // function makeStims(cond, i) {
  //   stims[i].condition = cond;
  // }

  // var makeStims = function(cond,i) {
  //   stimuli[i].condition = cond;
  // }
  // console.log("condition", cond)
  
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
    "subj_info",
    "thanks"
  ];

  exp.data_trials = [];

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
