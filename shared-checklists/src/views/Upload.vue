<template>
    <div>
        Upload<br>
        <!-- <button v-on:click="uploadTasks()">UploadTasks</button> -->
    </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator'
import {TodoDataServicesCollection} from '@/accessors/TodoDataServicesCollection';
import ITodoCollection from '@/models/todoCollection';
import QInput from 'quasar';

//Json Imports
import accountingsoftware from '@/assets/mock-data/accountingsoftware.json';
import acquisitions from '@/assets/mock-data/acquisitions.json';
import admiralmcraven from '@/assets/mock-data/admiralmcraven.json';
import agiledevelopment from '@/assets/mock-data/agiledevelopment.json';
import aloha from '@/assets/mock-data/aloha.json';
import askingdonations from '@/assets/mock-data/askingdonations.json';
import aspiringphilosophies from '@/assets/mock-data/aspiringphilosophies.json';
import assertiveness from '@/assets/mock-data/assertiveness.json';
import autocustomer from '@/assets/mock-data/autocustomer.json';
import beautifulconstraint from '@/assets/mock-data/beautifulconstraint.json';
import bodymindgut from '@/assets/mock-data/bodymindgut.json';
import buildfollowing from '@/assets/mock-data/buildfollowing.json';
import buildteams from '@/assets/mock-data/buildteams.json';
import businesscanvas from '@/assets/mock-data/businesscanvas.json';
import challengersale from '@/assets/mock-data/challengersale.json';
import chasingcool from '@/assets/mock-data/chasingcool.json';
import cloudcomputing from '@/assets/mock-data/cloudcomputing.json';
import cluster from '@/assets/mock-data/cluster.json';
import codesmarter from '@/assets/mock-data/codesmarter.json';
import coldemail from '@/assets/mock-data/coldemail.json';
import communication from '@/assets/mock-data/communication.json';
import competinganalytics from '@/assets/mock-data/competinganalytics.json';
import complexrequirements from '@/assets/mock-data/complexrequirements.json';
import constructionbudget from '@/assets/mock-data/constructionbudget.json';
import constructivefeedback from '@/assets/mock-data/constructivefeedback.json';
import customerquestionaire from '@/assets/mock-data/customerquestionaire.json';
import customerscoring from '@/assets/mock-data/customerscoring.json';
import customerselection from '@/assets/mock-data/customerselection.json';
import customersupport from '@/assets/mock-data/customersupport.json';
import daredisagree from '@/assets/mock-data/daredisagree.json';
import datascience from '@/assets/mock-data/datascience.json';
import datasciencemistakes from '@/assets/mock-data/datasciencemistakes.json';
import datasmart from '@/assets/mock-data/datasmart.json';
import davinci from '@/assets/mock-data/davinci.json';
import deliberateperformance from '@/assets/mock-data/deliberateperformance.json';
import demo from '@/assets/mock-data/demo.json';
import designchecklist from '@/assets/mock-data/designchecklist.json';
import designeverydaythings from '@/assets/mock-data/designeverydaythings.json';
import designofdesigns from '@/assets/mock-data/designofdesigns.json';
import deutchbranding from '@/assets/mock-data/deutchbranding.json';
import developanalyticaltalent from '@/assets/mock-data/developanalyticaltalent.json';
import developmentcommitments from '@/assets/mock-data/developmentcommitments.json';
import developmentconstruction from '@/assets/mock-data/developmentconstruction.json';
import developmentcontract1 from '@/assets/mock-data/developmentcontract1.json';
import developmentcontract2 from '@/assets/mock-data/developmentcontract2.json';
import developmentfeasibility from '@/assets/mock-data/developmentfeasibility.json';
import developmentidea from '@/assets/mock-data/developmentidea.json';
import developmentleasing from '@/assets/mock-data/developmentleasing.json';
import developmentproperty from '@/assets/mock-data/developmentproperty.json';
import developmentrefinement from '@/assets/mock-data/developmentrefinement.json';
import digitalmarketing from '@/assets/mock-data/digitalmarketing.json';
import domorefaster from '@/assets/mock-data/domorefaster.json';
import domoreless from '@/assets/mock-data/domoreless.json';
import drivemotivation from '@/assets/mock-data/drivemotivation.json';
import econchecklist from '@/assets/mock-data/econchecklist.json';
import efficiency from '@/assets/mock-data/efficiency.json';
import eightytwenty from '@/assets/mock-data/eightytwenty.json';
import einstein from '@/assets/mock-data/einstein.json';
import estimation from '@/assets/mock-data/estimation.json';
import exponentialgrowth from '@/assets/mock-data/exponentialgrowth.json';
import fasterreading from '@/assets/mock-data/fasterreading.json';
import financialmanagement from '@/assets/mock-data/financialmanagement.json';
import financialmodel from '@/assets/mock-data/financialmodel.json';
import findcustomer from '@/assets/mock-data/findcustomer.json';
import firsttwenty from '@/assets/mock-data/firsttwenty.json';
import fooledrandomness from '@/assets/mock-data/fooledrandomness.json';
import fourhour from '@/assets/mock-data/fourhour.json';
import fundingcompany from '@/assets/mock-data/fundingcompany.json';
import fundraising from '@/assets/mock-data/fundraising.json';
import gamego from '@/assets/mock-data/gamego.json';
import gamification from '@/assets/mock-data/gamification.json';
import geographyjobs from '@/assets/mock-data/geographyjobs.json';
import getbacked from '@/assets/mock-data/getbacked.json';
import getoutbuilding from '@/assets/mock-data/getoutbuilding.json';
import goalsetting from '@/assets/mock-data/goalsetting.json';
import gooddesign from '@/assets/mock-data/gooddesign.json';
import goodprofit from '@/assets/mock-data/goodprofit.json';
import greatemail from '@/assets/mock-data/greatemail.json';
import greyshell from '@/assets/mock-data/greyshell.json';
import growthhacking from '@/assets/mock-data/growthhacking.json';
import hardthings from '@/assets/mock-data/hardthings.json';
import henryford from '@/assets/mock-data/henryford.json';
import homeinspection from '@/assets/mock-data/homeinspection.json';
import hopenotmethod from '@/assets/mock-data/hopenotmethod.json';
import hypothesis from '@/assets/mock-data/hypothesis.json';
import ideanotproject from '@/assets/mock-data/ideanotproject.json';
import ids from '@/assets/mock-data/ids.json';
import innovators from '@/assets/mock-data/innovators.json';
import interview from '@/assets/mock-data/interview.json';
import investorpitch from '@/assets/mock-data/investorpitch.json';
import jesusceo from '@/assets/mock-data/jesusceo.json';
import leadership from '@/assets/mock-data/leadership.json';
import leadscoring from '@/assets/mock-data/leadscoring.json';
import learningcoding from '@/assets/mock-data/learningcoding.json';
import lending1 from '@/assets/mock-data/lending1.json';
import lending2 from '@/assets/mock-data/lending2.json';
import lessdumb from '@/assets/mock-data/lessdumb.json';
import magleadership from '@/assets/mock-data/magleadership.json';
import makinggooddecisions from '@/assets/mock-data/makinggooddecisions.json';
import management from '@/assets/mock-data/management.json';
import marketing from '@/assets/mock-data/marketing.json';
import marketing2 from '@/assets/mock-data/marketing2.json';
import marketinganalytics from '@/assets/mock-data/marketinganalytics.json';
import mcdonalds from '@/assets/mock-data/mcdonalds.json';
import mentalmodels from '@/assets/mock-data/mentalmodels.json';
import mlk from '@/assets/mock-data/mlk.json';
import mythicalmonth from '@/assets/mock-data/mythicalmonth.json';
import mythsentrepreneurship from '@/assets/mock-data/mythsentrepreneurship.json';
import namingstartup from '@/assets/mock-data/namingstartup.json';
import nathangoldwhy from '@/assets/mock-data/nathangoldwhy.json';
import negotiation from '@/assets/mock-data/negotiation.json';
import network from '@/assets/mock-data/network.json';
import nps from '@/assets/mock-data/nps.json';
import onboarding from '@/assets/mock-data/onboarding.json';
import onintel from '@/assets/mock-data/onintel.json';
import orghealth from '@/assets/mock-data/orghealth.json';
import orgviscompanies from '@/assets/mock-data/orgviscompanies.json';
import outsourcing from '@/assets/mock-data/outsourcing.json';
import patternlanguage from '@/assets/mock-data/patternlanguage.json';
import performancereview from '@/assets/mock-data/performancereview.json';
import personalcharacter from '@/assets/mock-data/personalcharacter.json';
import personalfuel from '@/assets/mock-data/personalfuel.json';
import personalgreatness from '@/assets/mock-data/personalgreatness.json';
import pipelinedebrief from '@/assets/mock-data/pipelinedebrief.json';
import pitch from '@/assets/mock-data/pitch.json';
import pitchanything from '@/assets/mock-data/pitchanything.json';
import pitchbusiness from '@/assets/mock-data/pitchbusiness.json';
import pitchstevejobs from '@/assets/mock-data/pitchstevejobs.json';
import poker from '@/assets/mock-data/poker.json';
import powerforget from '@/assets/mock-data/powerforget.json';
import powerhabit from '@/assets/mock-data/powerhabit.json';
import powerquestions from '@/assets/mock-data/powerquestions.json';
import predictablerevenue from '@/assets/mock-data/predictablerevenue.json';
import presale from '@/assets/mock-data/presale.json';
import preventerrors from '@/assets/mock-data/preventerrors.json';
import pricing from '@/assets/mock-data/pricing.json';
import productivity from '@/assets/mock-data/productivity.json';
import qualtesting from '@/assets/mock-data/qualtesting.json';
import quantesting from '@/assets/mock-data/quantesting.json';
import quarterlyplanning from '@/assets/mock-data/quarterlyplanning.json';
import quidproselling from '@/assets/mock-data/quidproselling.json';
import realestateleadgen from '@/assets/mock-data/realestateleadgen.json';
import retainingemployees from '@/assets/mock-data/retainingemployees.json';
import rocketfuel from '@/assets/mock-data/rocketfuel.json';
import salespractices from '@/assets/mock-data/salespractices.json';
import salesquestions from '@/assets/mock-data/salesquestions.json';
import samwalton from '@/assets/mock-data/samwalton.json';
import scaling from '@/assets/mock-data/scaling.json';
import scientificmethod from '@/assets/mock-data/scientificmethod.json';
import segmentation from '@/assets/mock-data/segmentation.json';
import selling from '@/assets/mock-data/selling.json';
import sequoiapitch from '@/assets/mock-data/sequoiapitch.json';
import simplicity from '@/assets/mock-data/simplicity.json';
import smartgetdone from '@/assets/mock-data/smartgetdone.json';
import softwarecycles from '@/assets/mock-data/softwarecycles.json';
import specialops from '@/assets/mock-data/specialops.json';
import storytelling from '@/assets/mock-data/storytelling.json';
import teamgreatness from '@/assets/mock-data/teamgreatness.json';
import tendays from '@/assets/mock-data/tendays.json';
import testassertions from '@/assets/mock-data/testassertions.json';
import theory from '@/assets/mock-data/theory.json';
import toughquestions from '@/assets/mock-data/toughquestions.json';
import traction from '@/assets/mock-data/traction.json';
import tractionmarketing from '@/assets/mock-data/tractionmarketing.json';
import twosecond from '@/assets/mock-data/twosecond.json';
import uninteruptedsales from '@/assets/mock-data/uninteruptedsales.json';
import universaldesign from '@/assets/mock-data/universaldesign.json';
import unlimitedpower from '@/assets/mock-data/unlimitedpower.json';
import usabilitynotes from '@/assets/mock-data/usabilitynotes.json';
import usabilityscoring from '@/assets/mock-data/usabilityscoring.json';
import userexperience from '@/assets/mock-data/userexperience.json';
import usertesting from '@/assets/mock-data/usertesting.json';
import validationchecklist from '@/assets/mock-data/validationchecklist.json';
import valueadded from '@/assets/mock-data/valueadded.json';
import valuepricing from '@/assets/mock-data/valuepricing.json';
import valueproposition from '@/assets/mock-data/valueproposition.json';
import valuingdomain from '@/assets/mock-data/valuingdomain.json';
import venturedeals from '@/assets/mock-data/venturedeals.json';
import warrenbuffet from '@/assets/mock-data/warrenbuffet.json';
import wayseal from '@/assets/mock-data/wayseal.json';
import websitesecurity from '@/assets/mock-data/websitesecurity.json';
import webusability from '@/assets/mock-data/webusability.json';
import whenquit from '@/assets/mock-data/whenquit.json';
import whogotback from '@/assets/mock-data/whogotback.json';
import winfriends from '@/assets/mock-data/winfriends.json';
import womenberkshire from '@/assets/mock-data/womenberkshire.json';
import work from '@/assets/mock-data/work.json';
import writingrules from '@/assets/mock-data/writingrules.json';
import yespersuasion from '@/assets/mock-data/yespersuasion.json';
import zeroone from '@/assets/mock-data/zeroone.json';


@Component
export default class Upload extends Vue {
    // public tasks: ITodoCollection[] = [
    //     accountingsoftware,
    //     acquisitions,
    //     admiralmcraven,
    //     agiledevelopment,
    //     aloha,
    //     askingdonations,
    //     aspiringphilosophies,
    //     assertiveness,
    //     autocustomer,
    //     beautifulconstraint,
    //     bodymindgut,
    //     buildfollowing,
    //     buildteams,
    //     businesscanvas,
    //     challengersale,
    //     chasingcool,
    //     cloudcomputing,
    //     cluster,
    //     codesmarter,
    //     coldemail,
    //     communication,
    //     competinganalytics,
    //     complexrequirements,
    //     constructionbudget,
    //     constructivefeedback,
    //     customerquestionaire,
    //     customerscoring,
    //     customerselection,
    //     customersupport,
    //     daredisagree,
    //     datascience,
    //     datasciencemistakes,
    //     datasmart,
    //     davinci,
    //     deliberateperformance,
    //     demo,
    //     designchecklist,
    //     designeverydaythings,
    //     designofdesigns,
    //     deutchbranding,
    //     developanalyticaltalent,
    //     developmentcommitments,
    //     developmentconstruction,
    //     developmentcontract1,
    //     developmentcontract2,
    //     developmentfeasibility,
    //     developmentidea,
    //     developmentleasing,
    //     developmentproperty,
    //     developmentrefinement,
    //     digitalmarketing,
    //     domorefaster,
    //     domoreless,
    //     drivemotivation,
    //     econchecklist,
    //     efficiency,
    //     eightytwenty,
    //     einstein,
    //     estimation,
    //     exponentialgrowth,
    //     fasterreading,
    //     financialmanagement,
    //     financialmodel,
    //     findcustomer,
    //     firsttwenty,
    //     fooledrandomness,
    //     fourhour,
    //     fundingcompany,
    //     fundraising,
    //     gamego,
    //     gamification,
    //     geographyjobs,
    //     getbacked,
    //     getoutbuilding,
    //     goalsetting,
    //     gooddesign,
    //     goodprofit,
    //     greatemail,
    //     greyshell,
    //     growthhacking,
    //     hardthings,
    //     henryford,
    //     homeinspection,
    //     hopenotmethod,
    //     hypothesis,
    //     ideanotproject,
    //     ids,
    //     innovators,
    //     interview,
    //     investorpitch,
    //     jesusceo,
    //     leadership,
    //     leadscoring,
    //     learningcoding,
    //     lending1,
    //     lending2,
    //     lessdumb,
    //     magleadership,
    //     makinggooddecisions,
    //     management,
    //     marketing,
    //     marketing2,
    //     marketinganalytics,
    //     mcdonalds,
    //     mentalmodels,
    //     mlk,
    //     mythicalmonth,
    //     mythsentrepreneurship,
    //     namingstartup,
    //     nathangoldwhy,
    //     negotiation,
    //     network,
    //     nps,
    //     onboarding,
    //     onintel,
    //     orghealth,
    //     orgviscompanies,
    //     outsourcing,
    //     patternlanguage,
    //     performancereview,
    //     personalcharacter,
    //     personalfuel,
    //     personalgreatness,
    //     pipelinedebrief,
    //     pitch,
    //     pitchanything,
    //     pitchbusiness,
    //     pitchstevejobs,
    //     poker,
    //     powerforget,
    //     powerhabit,
    //     powerquestions,
    //     predictablerevenue,
    //     presale,
    //     preventerrors,
    //     pricing,
    //     productivity,
    //     qualtesting,
    //     quantesting,
    //     quarterlyplanning,
    //     quidproselling,
    //     realestateleadgen,
    //     retainingemployees,
    //     rocketfuel,
    //     salespractices,
    //     salesquestions,
    //     samwalton,
    //     scaling,
    //     scientificmethod,
    //     segmentation,
    //     selling,
    //     sequoiapitch,
    //     simplicity,
    //     smartgetdone,
    //     softwarecycles,
    //     specialops,
    //     storytelling,
    //     teamgreatness,
    //     tendays,
    //     testassertions,
    //     theory,
    //     toughquestions,
    //     traction,
    //     tractionmarketing,
    //     twosecond,
    //     uninteruptedsales,
    //     universaldesign,
    //     unlimitedpower,
    //     usabilitynotes,
    //     usabilityscoring,
    //     userexperience,
    //     usertesting,
    //     validationchecklist,
    //     valueadded,
    //     valuepricing,
    //     valueproposition,
    //     valuingdomain,
    //     venturedeals,
    //     warrenbuffet,
    //     wayseal,
    //     websitesecurity,
    //     webusability,
    //     whenquit,
    //     whogotback,
    //     winfriends,
    //     womenberkshire,
    //     work,
    //     writingrules,
    //     yespersuasion,
    //     zeroone,
    //     ];
    
    // public uploadTasks() {
    //     let todoDataService = new TodoDataServicesCollection();
        
    //     this.tasks.map((task: ITodoCollection) => {
    //         todoDataService.Add(task);
    //     })

    // }

}

</script>