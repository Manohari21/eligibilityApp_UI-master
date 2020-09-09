function ajaxCall1(){this.send=function(data,url,method,success,type){type=type||'json';var successRes=function(data){success(data);}
var errorRes=function(e){console.log(e);}
jQuery.ajax({url:url,type:method,data:data,success:successRes,error:errorRes,dataType:type,timeout:60000});}}
function locationInfo1(){var rootUrl="//geodata.solutions/api/api.php";var username='demo';var ordering='name';var addParams='';if(jQuery("#gds_appid").length>0){addParams+='&appid='+jQuery("#gds_appid").val();}
if(jQuery("#gds_hash").length>0){addParams+='&hash='+jQuery("#gds_hash").val();}
var call=new ajaxCall1();this.confCity=function(id){var url=rootUrl+'?type=confCity&countryId='+jQuery('#countryCode option:selected').attr('countryid')+'&stateId='+jQuery('#stateCode option:selected').attr('stateid')+'&cityId='+id;var method="post";var data={};call.send(data,url,method,function(data){if(data){}
else{}});};this.getCities=function(id){jQuery(".cities1 option:gt(0)").remove();var stateClasses=jQuery('#cityCode').attr('class');var cC=stateClasses.split(" ");cC.shift();var addClasses='';if(cC.length>0)
{acC=cC.join();addClasses='&addClasses='+encodeURIComponent(acC);}
var url=rootUrl+'?type=getCities&countryId='+jQuery('#countryCode option:selected').attr('countryid')+'&stateId='+id+addParams+addClasses;var method="post";var data={};jQuery('.cities1').find("option:eq(0)").html("Please wait..");call.send(data,url,method,function(data){jQuery('.cities1').find("option:eq(0)").html("Select City");if(data.tp==1){if(data.hits>1000)
{console.log('Daily geodata.solutions request limit exceeded count:'+data.hits+' of 1000');}
else
{console.log('Daily geodata.solutions request count:'+data.hits+' of 1000')}
var listlen=Object.keys(data['result']).length;if(listlen>0)
{jQuery.each(data['result'],function(key,val){var option=jQuery('<option />');option.attr('value',val).text(val);jQuery('.cities1').append(option);});}
else
{var usestate=jQuery('#stateCode option:selected').val();var option=jQuery('<option />');option.attr('value',usestate).text(usestate);option.attr('selected','selected');jQuery('.cities1').append(option);}
jQuery(".cities1").prop("disabled",false);}
else{alert(data.msg);}});};this.getStates=function(id){jQuery(".states1 option:gt(0)").remove();jQuery(".cities1 option:gt(0)").remove();var stateClasses=jQuery('#stateCode').attr('class');var cC=stateClasses.split(" ");cC.shift();var addClasses='';if(cC.length>0)
{acC=cC.join();addClasses='&addClasses='+encodeURIComponent(acC);}
var url=rootUrl+'?type=getStates&countryId='+id+addParams+addClasses;var method="post";var data={};jQuery('.states1').find("option:eq(0)").html("Please wait..");call.send(data,url,method,function(data){jQuery('.states1').find("option:eq(0)").html("Select State");if(data.tp==1){if(data.hits>1000)
{console.log('Daily geodata.solutions request limit exceeded:'+data.hits+' of 1000');}
else
{console.log('Daily geodata.solutions request count:'+data.hits+' of 1000')}
jQuery.each(data['result'],function(key,val){var option=jQuery('<option />');option.attr('value',val).text(val);option.attr('stateid',key);jQuery('.states1').append(option);});jQuery(".states1").prop("disabled",false);}
else{alert(data.msg);}});};this.getCountries=function(){var countryClasses=jQuery('#countryCode').attr('class');var cC=countryClasses.split(" ");cC.shift();var addClasses='';if(cC.length>0)
{acC=cC.join();addClasses='&addClasses='+encodeURIComponent(acC);}
var presel=false;var iip='N';jQuery.each(cC,function(index,value){if(value.match("^presel-")){presel=value.substring(7);}
if(value.match("^presel-byi"))
{var iip='Y';}});var url=rootUrl+'?type=getCountries'+addParams+addClasses;var method="post";var data={};jQuery('.countries1').find("option:eq(0)").html("Please wait..");call.send(data,url,method,function(data){jQuery('.countries1').find("option:eq(0)").html("Select Country");if(data.tp==1){if(data.hits>1000)
{console.log('Daily geodata.solutions request limit exceeded:'+data.hits+' of 1000');}
else
{console.log('Daily geodata.solutions request count:'+data.hits+' of 1000')}
if(presel=='byip')
{presel=data['presel'];console.log('2 presel is set as '+presel);}
if(jQuery.inArray("group-continents",cC)>-1)
{var $select=jQuery('.countries1');console.log(data['result']);jQuery.each(data['result'],function(i,optgroups){var $optgroup=jQuery("<optgroup>",{label:i});if(optgroups.length>0)
{$optgroup.appendTo($select);}
jQuery.each(optgroups,function(groupName,options){var coption=jQuery('<option />');coption.attr('value',options.name).text(options.name);coption.attr('countryid',options.id);if(presel){if(presel.toUpperCase()==options.id){coption.attr('selected','selected');}}
coption.appendTo($optgroup);});});}
else
{jQuery.each(data['result'],function(key,val){var option=jQuery('<option />');option.attr('value',val).text(val);option.attr('countryid',key);if(presel)
{if(presel.toUpperCase()==key)
{option.attr('selected','selected');}}
jQuery('.countries1').append(option);});}
if(presel)
{jQuery('.countries1').trigger('change');}
jQuery(".countries1").prop("disabled",false);}
else{alert(data.msg);}});};}
jQuery(function(){var loc=new locationInfo1();loc.getCountries();jQuery(".countries1").on("change",function(ev){var countryCode=jQuery("option:selected",this).attr('countryid');if(countryCode!=''){loc.getStates(countryCode);}
else{jQuery(".states1 option:gt(0)").remove();}});jQuery(".states1").on("change",function(ev){var stateCode=jQuery("option:selected",this).attr('stateid');if(stateCode!=''){loc.getCities(stateCode);}
else{jQuery(".cities1 option:gt(0)").remove();}});jQuery(".cities1").on("change",function(ev){var cityCode=jQuery("option:selected",this).val();if(cityCode!=''){loc.confCity(cityCode);}});});