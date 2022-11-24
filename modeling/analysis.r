library(jsonlite)
library(tidyverse)
library(rwebppl)

setwd(dirname(rstudioapi::getActiveDocumentContext()$path))

base = 6
expand = 4

code <- read_file("main_model")
code_binary <- read_file("model_binaryqud")
code_waldoncheck <- read_file("model_waldoncheck")
code_waldon <- read_file("model_waldon")

eval_webppl_main <- function(command) {
  webppl(paste(code,command,sep="\n"))
}

eval_webppl_binary <- function(command) {
  webppl(paste(code_binary ,command,sep="\n"))
}

eval_webppl_waldoncheck <- function(command) {
  webppl(paste(code_waldoncheck ,command,sep="\n"))
}

eval_webppl_waldon <- function(command) {
  webppl(paste(code_waldon ,command,sep="\n"))
}



##################################################

graph <- function(data) {
  
  data$prob <- as.numeric(data$prob)
  data$support <-  ordered(data$support, levels = c("twenty", "twenty-one", "twenty-two", "twenty-three", "twenty-four", "twenty-five", "twenty-six", "twenty-seven", "twenty-eight", "twenty-nine", "thirty"))
  levels(data$support) <- c("twenty", "twenty-one", "twenty-two", "twenty-three", "twenty-four", "twenty-five", "twenty-six", "twenty-seven", "twenty-eight", "twenty-nine", "thirty")
  
  p <- data %>%
    #arrange(x) %>%
    ggplot(aes(x=support,y=prob)) +
    theme_bw() +
    theme(text = element_text(size = base * expand / 2, face = "bold")) +
    geom_bar(stat="identity",position = "dodge") +
    xlab("Utterance") +
    ylab("Probability") 
  
  return(p)
  
}

##################################################

graph_listener <- function(data) {
  
  data$prob <- as.numeric(data$prob)
  data$support <-  factor(data$support)
#  labels = c(expression(20), 
#             expression(21), expression(22), 
#             expression(23), expression(24), 
#             expression(25), expression(26),
#             expression(27), expression(28),
#             expression(29), expression(30))
  
  labels = c(20, 
             21,22, 
             23, 24,
             25, 26,
             27, 28,
             29, 30)
  
  p <- data %>%
    #arrange(x) %>%
    ggplot(aes(x=support,y=prob)) +
    theme_bw() +
    theme(text = element_text(size = base * expand / 2, face = "bold")) +
    geom_bar(stat="identity",position = "dodge") +
    xlab("Value") +
    ylab("Probability") +
    scale_x_discrete(labels = parse(text = labels))
  
  return(p)
  
}

##################################################

#Pragmatic listener, Waldon model, all, a1.0, b1.0, yeshalos:

listener_Waldon_all_a1.0_b1.0_yeshalos <- eval_webppl_waldon("pragmaticListener('all',1.0,1.0,yeshalos)")

p <- graph_listener(listener_Waldon_all_a1.0_b1.0_yeshalos)
p
ggsave("1-listener-Waldon-all-a1.0-b1.0-yeshalos.pdf", width = 4, height = 2, units = "in")

#Pragmatic listener, Waldon model, the, a1.0, b1.0, yeshalos:

listener_Waldon_the_a1.0_b1.0_yeshalos <- eval_webppl_waldon("pragmaticListener('the',1.0,1.0,yeshalos)")

p <- graph_listener(listener_Waldon_the_a1.0_b1.0_yeshalos)
p
ggsave("2-listener-Waldon-the-a1.0-b1.0-yeshalos.pdf", width = 4, height = 2, units = "in")

#Pragmatic listener, Waldon model, most, a1.0, b1.0, yeshalos:

listener_Waldon_most_a1.0_b1.0_yeshalos <- eval_webppl_waldon("pragmaticListener('most',1.0,1.0,yeshalos)")

p <- graph_listener(listener_Waldon_most_a1.0_b1.0_yeshalos)
p
ggsave("3-listener-Waldon-most-a1.0-b1.0-yeshalos.pdf", width = 4, height = 2, units = "in")

#Pragmatic listener, Waldon model, some, a1.0, b1.0, yeshalos:

listener_Waldon_some_a1.0_b1.0_yeshalos <- eval_webppl_waldon("pragmaticListener('some',1.0,1.0,yeshalos)")

p <- graph_listener(listener_Waldon_some_a1.0_b1.0_yeshalos)
p
ggsave("4-listener-Waldon-some-a1.0-b1.0-yeshalos.pdf", width = 4, height = 2, units = "in")

#Pragmatic listener, Waldon model, none, a1.0, b1.0, yeshalos:

listener_Waldon_none_a1.0_b1.0_yeshalos <- eval_webppl_waldon("pragmaticListener('none',1.0,1.0,yeshalos)")

p <- graph_listener(listener_Waldon_none_a1.0_b1.0_yeshalos)
p
ggsave("5-listener-Waldon-none-a1.0-b1.0-yeshalos.pdf", width = 4, height = 2, units = "in")

#Pragmatic listener, Waldon check, all, a1.0, b1.0, allimp, theuttalpha, allhalos, lowerMeanings, costeven:

listener_all_a1.0_b1.0_allimp_theuttalpha_allhalos_lower_costeven <- eval_webppl_waldoncheck("pragmaticListener('all',1.0,1.0,allimp,theuttalpha,allhalos,lowerMeanings,costeven)")

p <- graph_listener(listener_all_a1.0_b1.0_allimp_theuttalpha_allhalos_lower_costeven)
p
ggsave("6-listener-all-a1.0-b1.0-allimp-theuttalpha-allhalos-lower-costeven.pdf", width = 4, height = 2, units = "in")

#Pragmatic listener, Waldon check, the, a1.0, b1.0, allimp, theuttalpha, allhalos, lowerMeanings, costeven:

listener_the_a1.0_b1.0_allimp_theuttalpha_allhalos_lower_costeven <- eval_webppl_waldoncheck("pragmaticListener('the',1.0,1.0,allimp,theuttalpha,allhalos,lowerMeanings,costeven)")

p <- graph_listener(listener_the_a1.0_b1.0_allimp_theuttalpha_allhalos_lower_costeven)
p
ggsave("7-listener-the-a1.0-b1.0-allimp-theuttalpha-allhalos-lower-costeven.pdf", width = 4, height = 2, units = "in")

#Pragmatic listener, Waldon check, most, a1.0, b1.0, allimp, theuttalpha, allhalos, lowerMeanings, costeven:

listener_most_a1.0_b1.0_allimp_theuttalpha_allhalos_lower_costeven <- eval_webppl_waldoncheck("pragmaticListener('most',1.0,1.0,allimp,theuttalpha,allhalos,lowerMeanings,costeven)")

p <- graph_listener(listener_most_a1.0_b1.0_allimp_theuttalpha_allhalos_lower_costeven)
p
ggsave("8-listener-most-a1.0-b1.0-allimp-theuttalpha-allhalos-lower-costeven.pdf", width = 4, height = 2, units = "in")

#Pragmatic listener, Waldon check, some, a1.0, b1.0, allimp, theuttalpha, allhalos, lowerMeanings, costeven:

listener_some_a1.0_b1.0_allimp_theuttalpha_allhalos_lower_costeven <- eval_webppl_waldoncheck("pragmaticListener('some',1.0,1.0,allimp,theuttalpha,allhalos,lowerMeanings,costeven)")

p <- graph_listener(listener_some_a1.0_b1.0_allimp_theuttalpha_allhalos_lower_costeven)
p
ggsave("9-listener-some-a1.0-b1.0-allimp-theuttalpha-allhalos-lower-costeven.pdf", width = 4, height = 2, units = "in")

#Pragmatic listener, Waldon check, none, a1.0, b1.0, allimp, theuttalpha, allhalos, lowerMeanings, costeven:

listener_none_a1.0_b1.0_allimp_theuttalpha_allhalos_lower_costeven <- eval_webppl_waldoncheck("pragmaticListener('none',1.0,1.0,allimp,theuttalpha,allhalos,lowerMeanings,costeven)")

p <- graph_listener(listener_none_a1.0_b1.0_allimp_theuttalpha_allhalos_lower_costeven)
p
ggsave("10-listener-none-a1.0-b1.0-allimp-theuttalpha-allhalos-lower-costeven.pdf", width = 4, height = 2, units = "in")

##################################################
##################################################

#Predictions of the alpha-differentiated model for round and sharp numbers, alpha 3x for sharp numbers; figures for QP1 - v0.6.

#Pragmatic listener, twenty-five, a1.0, b1.0, allimp, rounduttalphas, allhalos, lowerMeanings, smallcosts:

listener_twentyfive_a1.0_b1.0_allimp_rounduttalphas_allhalos_lower_smallcosts <- eval_webppl_main("pragmaticListener('twenty-five',1.0,1.0,allimp,rounduttalphas,allhalos,lowerMeanings,smallcosts)")

p <- graph_listener(listener_twentyfive_a1.0_b1.0_allimp_rounduttalphas_allhalos_lower_smallcosts)
p
ggsave("11a-listener-twentyfive-a1.0-b1.0-allimp-rounduttalphas-allhalos-lower-smallcosts.pdf", width = 4, height = 2, units = "in")

#Pragmatic listener, twenty-five, a5.0, b1.0, allimp, rounduttalphas, allhalos, lowerMeanings, smallcosts:

listener_twentyfive_a5.0_b1.0_allimp_rounduttalphas_allhalos_lower_smallcosts <- eval_webppl_main("pragmaticListener('twenty-five',5.0,1.0,allimp,rounduttalphas,allhalos,lowerMeanings,smallcosts)")

p <- graph_listener(listener_twentyfive_a5.0_b1.0_allimp_rounduttalphas_allhalos_lower_smallcosts)
p
ggsave("11b-listener-twentyfive-a5.0-b1.0-allimp-rounduttalphas-allhalos-lower-smallcosts.pdf", width = 4, height = 2, units = "in")

#Pragmatic listener, twenty-five, a1.0, b3.0, allimp, rounduttalphas, allhalos, lowerMeanings, smallcosts:

listener_twentyfive_a1.0_b3.0_allimp_rounduttalphas_allhalos_lower_smallcosts <- eval_webppl_main("pragmaticListener('twenty-five',1.0,3.0,allimp,rounduttalphas,allhalos,lowerMeanings,smallcosts)")

p <- graph_listener(listener_twentyfive_a1.0_b3.0_allimp_rounduttalphas_allhalos_lower_smallcosts)
p
ggsave("11c-listener-twentyfive-a1.0-b3.0-allimp-rounduttalphas-allhalos-lower-smallcosts.pdf", width = 4, height = 2, units = "in")

#Pragmatic listener, twenty-five, a5.0, b3.0, allimp, rounduttalphas, allhalos, lowerMeanings, smallcosts:

listener_twentyfive_a5.0_b3.0_allimp_rounduttalphas_allhalos_lower_smallcosts <- eval_webppl_main("pragmaticListener('twenty-five',5.0,3.0,allimp,rounduttalphas,allhalos,lowerMeanings,smallcosts)")

p <- graph_listener(listener_twentyfive_a5.0_b3.0_allimp_rounduttalphas_allhalos_lower_smallcosts)
p
ggsave("11d-listener-twentyfive-a5.0-b3.0-allimp-rounduttalphas-allhalos-lower-smallcosts.pdf", width = 4, height = 2, units = "in")

#Pragmatic listener, twenty-five, a1.0, b0.5, allimp, rounduttalphas, allhalos, lowerMeanings, smallcosts:

listener_twentyfive_a1.0_b0.5_allimp_rounduttalphas_allhalos_lower_smallcosts <- eval_webppl_main("pragmaticListener('twenty-five',1.0,0.5,allimp,rounduttalphas,allhalos,lowerMeanings,smallcosts)")

p <- graph_listener(listener_twentyfive_a1.0_b0.5_allimp_rounduttalphas_allhalos_lower_smallcosts)
p
ggsave("11e-listener-twentyfive-a1.0-b0.5-allimp-rounduttalphas-allhalos-lower-smallcosts.pdf", width = 4, height = 2, units = "in")

#Pragmatic listener, twenty-five, a5.0, b0.5, allimp, rounduttalphas, allhalos, lowerMeanings, smallcosts:

listener_twentyfive_a5.0_b0.5_allimp_rounduttalphas_allhalos_lower_smallcosts <- eval_webppl_main("pragmaticListener('twenty-five',5.0,0.5,allimp,rounduttalphas,allhalos,lowerMeanings,smallcosts)")

p <- graph_listener(listener_twentyfive_a5.0_b0.5_allimp_rounduttalphas_allhalos_lower_smallcosts)
p
ggsave("11f-listener-twentyfive-a5.0-b0.5-allimp-rounduttalphas-allhalos-lower-smallcosts.pdf", width = 4, height = 2, units = "in")

#Pragmatic listener, twenty-five, a1.0, b0.5, allimp, rounduttalphas, allhalos, upperMeanings, smallcosts:

listener_twentyfive_a1.0_b0.5_allimp_rounduttalphas_allhalos_upper_smallcosts <- eval_webppl_main("pragmaticListener('twenty-five',1.0,0.5,allimp,rounduttalphas,allhalos,upperMeanings,smallcosts)")

p <- graph_listener(listener_twentyfive_a1.0_b0.5_allimp_rounduttalphas_allhalos_upper_smallcosts)
p
ggsave("11g-listener-twentyfive-a1.0-b0.5-allimp-rounduttalphas-allhalos-upper-smallcosts.pdf", width = 4, height = 2, units = "in")

#Pragmatic listener, twenty-five, a5.0, b0.5, allimp, rounduttalphas, allhalos, upperMeanings, smallcosts:

listener_twentyfive_a5.0_b0.5_allimp_rounduttalphas_allhalos_upper_smallcosts <- eval_webppl_main("pragmaticListener('twenty-five',5.0,0.5,allimp,rounduttalphas,allhalos,upperMeanings,smallcosts)")

p <- graph_listener(listener_twentyfive_a5.0_b0.5_allimp_rounduttalphas_allhalos_upper_smallcosts)
p
ggsave("11h-listener-twentyfive-a5.0-b0.5-allimp-rounduttalphas-allhalos-upper-smallcosts.pdf", width = 4, height = 2, units = "in")

#Pragmatic listener, twenty-three, a1.0, b1.0, allimp, rounduttalphas, allhalos, lowerMeanings, smallcosts:

listener_twentythree_a1.0_b1.0_allimp_rounduttalphas_allhalos_lower_smallcosts <- eval_webppl_main("pragmaticListener('twenty-three',1.0,1.0,allimp,rounduttalphas,allhalos,lowerMeanings,smallcosts)")

p <- graph_listener(listener_twentythree_a1.0_b1.0_allimp_rounduttalphas_allhalos_lower_smallcosts)
p
ggsave("11i-listener-twentythree-a1.0-b1.0-allimp-rounduttalphas-allhalos-lower-smallcosts.pdf", width = 4, height = 2, units = "in")

#Pragmatic listener, twenty-three, a5.0, b1.0, allimp, rounduttalphas, allhalos, lowerMeanings, smallcosts:

listener_twentythree_a5.0_b1.0_allimp_rounduttalphas_allhalos_lower_smallcosts <- eval_webppl_main("pragmaticListener('twenty-three',5.0,1.0,allimp,rounduttalphas,allhalos,lowerMeanings,smallcosts)")

p <- graph_listener(listener_twentythree_a5.0_b1.0_allimp_rounduttalphas_allhalos_lower_smallcosts)
p
ggsave("11j-listener-twentythree-a5.0-b1.0-allimp-rounduttalphas-allhalos-lower-smallcosts.pdf", width = 4, height = 2, units = "in")

#Pragmatic listener, twenty-three, a1.0, b0.5, allimp, rounduttalphas, allhalos, lowerMeanings, smallcosts:

listener_twentythree_a1.0_b0.5_allimp_rounduttalphas_allhalos_lower_smallcosts <- eval_webppl_main("pragmaticListener('twenty-three',1.0,0.5,allimp,rounduttalphas,allhalos,lowerMeanings,smallcosts)")

p <- graph_listener(listener_twentythree_a1.0_b0.5_allimp_rounduttalphas_allhalos_lower_smallcosts)
p
ggsave("11k-listener-twentythree-a1.0-b0.5-allimp-rounduttalphas-allhalos-lower-smallcosts.pdf", width = 4, height = 2, units = "in")

#Pragmatic listener, twenty-three, a5.0, b0.5, allimp, rounduttalphas, allhalos, lowerMeanings, smallcosts:

listener_twentythree_a5.0_b0.5_allimp_rounduttalphas_allhalos_lower_smallcosts <- eval_webppl_main("pragmaticListener('twenty-three',5.0,0.5,allimp,rounduttalphas,allhalos,lowerMeanings,smallcosts)")

p <- graph_listener(listener_twentythree_a5.0_b0.5_allimp_rounduttalphas_allhalos_lower_smallcosts)
p
ggsave("11l-listener-twentythree-a5.0-b0.5-allimp-rounduttalphas-allhalos-lower-smallcosts.pdf", width = 4, height = 2, units = "in")

#Pragmatic listener, twenty-three, a1.0, b0.5, allimp, rounduttalphas, allhalos, upperMeanings, smallcosts:

listener_twentythree_a1.0_b0.5_allimp_rounduttalphas_allhalos_upper_smallcosts <- eval_webppl_main("pragmaticListener('twenty-three',1.0,0.5,allimp,rounduttalphas,allhalos,upperMeanings,smallcosts)")

p <- graph_listener(listener_twentythree_a1.0_b0.5_allimp_rounduttalphas_allhalos_upper_smallcosts)
p
ggsave("11m-listener-twentythree-a1.0-b0.5-allimp-rounduttalphas-allhalos-upper-smallcosts.pdf", width = 4, height = 2, units = "in")

#Pragmatic listener, twenty-three, a5.0, b0.5, allimp, rounduttalphas, allhalos, upperMeanings, smallcosts:

listener_twentythree_a5.0_b0.5_allimp_rounduttalphas_allhalos_upper_smallcosts <- eval_webppl_main("pragmaticListener('twenty-three',5.0,0.5,allimp,rounduttalphas,allhalos,upperMeanings,smallcosts)")

p <- graph_listener(listener_twentythree_a5.0_b0.5_allimp_rounduttalphas_allhalos_upper_smallcosts)
p
ggsave("11n-listener-twentythree-a5.0-b0.5-allimp-rounduttalphas-allhalos-upper-smallcosts.pdf", width = 4, height = 2, units = "in")

##################################################
##################################################

#Predictions of the pared-down model for round and sharp numbers, alpha=1 for all numbers, beta=1 for round, 0.5 for sharp.
#These are the new assumptions for the model looking only at the impact of contextual boundaries and if the Waldon model can
#account for imprecise use of numbers.

#Pragmatic listener, twenty-five, a1.0, b1.0, allimp, lowuttalphas, r_v_shalos, lowerMeanings, smallcosts:

listener_twentyfive_a1.0_b1.0_allimp_lowuttalphas_r_v_shalos_lower_smallcosts <- eval_webppl_main("pragmaticListener('twenty-five',1.0,1.0,allimp,lowuttalphas,r_v_shalos,lowerMeanings,smallcosts)")

p <- graph_listener(listener_twentyfive_a1.0_b1.0_allimp_lowuttalphas_r_v_shalos_lower_smallcosts)
p
ggsave("12a-listener-twentyfive-a1.0-b1.0-allimp-lowuttalphas-r_v_shalos-lower-smallcosts.pdf", width = 4, height = 2, units = "in")

#Pragmatic listener, twenty-five, a1.0, b1.0, allimp, lowuttalphas, r_v_shalos, upperMeanings, smallcosts:

listener_twentyfive_a1.0_b1.0_allimp_lowuttalphas_r_v_shalos_upper_smallcosts <- eval_webppl_main("pragmaticListener('twenty-five',1.0,1.0,allimp,lowuttalphas,r_v_shalos,upperMeanings,smallcosts)")

p <- graph_listener(listener_twentyfive_a1.0_b1.0_allimp_lowuttalphas_r_v_shalos_upper_smallcosts)
p
ggsave("12b-listener-twentyfive-a1.0-b1.0-allimp-lowuttalphas-r_v_shalos-upper-smallcosts.pdf", width = 4, height = 2, units = "in")

#Pragmatic listener, twenty-three, a1.0, b1.0, allimp, lowuttalphas, r_v_shalos, lowerMeanings, smallcosts:

listener_twentythree_a1.0_b1.0_allimp_lowuttalphas_r_v_shalos_lower_smallcosts <- eval_webppl_main("pragmaticListener('twenty-three',1.0,1.0,allimp,lowuttalphas,r_v_shalos,lowerMeanings,smallcosts)")

p <- graph_listener(listener_twentythree_a1.0_b1.0_allimp_lowuttalphas_r_v_shalos_lower_smallcosts)
p
ggsave("12c-listener-twentythree-a1.0-b1.0-allimp-lowuttalphas-r_v_shalos-lower-smallcosts.pdf", width = 4, height = 2, units = "in")

#Pragmatic listener, twenty-three, a1.0, b1.0, allimp, lowuttalphas, r_v_shalos, upperMeanings, smallcosts:

listener_twentythree_a1.0_b1.0_allimp_lowuttalphas_r_v_shalos_upper_smallcosts <- eval_webppl_main("pragmaticListener('twenty-three',1.0,1.0,allimp,lowuttalphas,r_v_shalos,upperMeanings,smallcosts)")

p <- graph_listener(listener_twentythree_a1.0_b1.0_allimp_lowuttalphas_r_v_shalos_upper_smallcosts)
p
ggsave("12d-listener-twentythree-a1.0-b1.0-allimp-lowuttalphas-r_v_shalos-upper-smallcosts.pdf", width = 4, height = 2, units = "in")



##################################################
##################################################

#Predictions of the pared-down model with exact semantics.

#Pragmatic listener, twenty-five, a1.0, b1.0, allimp, lowuttalphas, r_v_shalos, exactMeanings, smallcosts:

listener_twentyfive_a1.0_b1.0_allimp_lowuttalphas_r_v_shalos_exact_smallcosts <- eval_webppl_main("pragmaticListener('twenty-five',1.0,1.0,allimp,lowuttalphas,r_v_shalos,exactMeanings,smallcosts)")

p <- graph_listener(listener_twentyfive_a1.0_b1.0_allimp_lowuttalphas_r_v_shalos_exact_smallcosts)
p
ggsave("13-listener-twentyfive-a1.0-b1.0-allimp-lowuttalphas-r_v_shalos-exact-smallcosts.pdf", width = 4, height = 2, units = "in")









#
