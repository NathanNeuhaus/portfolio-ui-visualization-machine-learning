
var B               = document.body;
var GLOBAL_COUNT    = 0;
var UT              = UtCrossBrowser();
var OMAP            = ObjectMap();
var COMPS           = ComponentFury();
var SERVER          = ServerListWidget( );

var COLGREY_0 = "#EFEFEF";
var GREY_1 = "#F5F5F5";
var GREY_2 = "#DDDDDD";
var GREY_3 = "#ADADAD";

var COLUMNS = -1;


function callMDF(){
    console.log("MDF");
    var h = 40;
    var w = 15;
    var x0 = 100;
    var y0 = 100;
    var colors = [0,3,3,3,3,0,0,4,3,4];
    return MDF_A( w, h, x0, y0, colors );
}

function callMDF2(){
    console.log("MDF2");
    var h = 40;
    var w = 15;
    var x0 = 0;
    var y0 = 0;
    var colors1 = [0,3,4,0,4,3,4,4,4,4,3,3,3];
    var colors2 = [0,3,3,3,3,3,3,4,3,4,0,3,3,3,3,0,0,4,3,4];
    var colors3 = [0,3,4,4,4,0,0];
    var colors = [ colors1, colors2, colors3 ];
    return MDF_B( w, h, x0, y0, colors );
}


function MDF_B( w, h, x0, y0, colors2d ){
    var STKW = 0.5;
    var n = colors2d.length;
    var y, offset;
    var colors;
    var maxLen = maxLength( colors2d ); 
    var MDFS = [];
    var MDF;
    var div = document.createElement("div");
    var maxW = 0;
    
    for(var i = 0 ; i < n; i++ ){
        y       = y0 + ( h * i );
        colors  = colors2d[ i ];
        offset  = ( maxLen - colors.length );
        offset  = offset === 0 ? 0 : offset / 2;
        offset  = (( w  )* offset);
        MDF = MDF_A( w, h, x0 + offset, y, colors); 
        if((x0 + offset) > maxW) maxW = (x0 + offset );
        MDFS.push( MDF );
        div.appendChild( MDF ); 
    }

    function maxLength( array2d ){ 
        var mx = Number.MIN_SAFE_INTEGER; 
        for( var i = 0; i < array2d.length; i++ ){
            if( array2d[i].length > mx ) mx = array2d[i].length;
        }
        //console.log("maxLen: " + mx); 
        return mx;
    }
    
    div.style.position = "absolute";
    div.style.height = (n*h)+"px";
    div.style.width = ((n*maxW) + (w*1.5))+"px";
    div.style.left = "0";
    div.style.top = "0";
    div.style.border = WIREFRAME;
    
    
    return div;
}


function MDF_B_RATIO( w, h, x0, y0, colors2d, ratios2d ){
    var STKW = 0.5;
    var n = colors2d.length;
    var y, offset;
    var colors, ratios;
    var maxLen = maxLength( colors2d ); 
    var MDFS = [];
    var MDF;
    var div = document.createElement("div");
    var maxW = 0;
    
    for(var i = 0 ; i < n; i++ ){
        y       = y0 + ( h * i );
        colors  = colors2d[ i ];
        ratios  = ratios2d[ i ];
        offset  = ( maxLen - colors.length );
        offset  = offset === 0 ? 0 : offset / 2;
        offset  = (( w  )* offset);
        MDF = MDF_A_RATIO( w, h, x0 + offset, y, colors, ratios ); 
        
        if((x0 + offset) > maxW) maxW = (x0 + offset );
        MDFS.push( MDF );
        div.appendChild( MDF ); 
    }

    function maxLength( array2d ){ 
        var mx = Number.MIN_SAFE_INTEGER; 
        for( var i = 0; i < array2d.length; i++ ){
            if( array2d[i].length > mx ) mx = array2d[i].length;
        }
        //console.log("maxLen: " + mx); 
        return mx;
    }
    
    div.style.position = "absolute";
    div.style.height = (n*h)+"px";
    div.style.width = ((n*maxW) + (w*1.5))+"px";
    div.style.left = "0";
    div.style.top = "0";
    div.style.border = WIREFRAME;
    
    
    return div;
}
function MDF_A_RATIO( w, h, x0, y0, colors, ratios ){
  //here
  var ratio = 0.2;
  var line = 1;
  var par = document.body;
  var r = 8;
  var n = colors.length;
  var STKW = 0.5;
  var stroke = 'stroke-linecap="round" stroke="lightgrey"  stroke-width="'+STKW+'"';
  
  var colorids = [ 
      GRADIENT_INDICES++, GRADIENT_INDICES++, GRADIENT_INDICES++, 
      GRADIENT_INDICES++, GRADIENT_INDICES++, GRADIENT_INDICES++ ];
  
  var svgid = "MDF_"+line+"_"+UT.count();
  var build = "";
      build +=SVG.openSVG( svgid, "100%", "100%")
            + SVG.openDefinition()
                + SVG.templates.White( colorids[0] )
                + SVG.templates.GradBlueLight0( colorids[1] )
                + SVG.templates.GradBlueLight1( colorids[2] )
                + SVG.templates.GradBlueLight2( colorids[3] )
                + SVG.templates.GradBlueLight3( colorids[4] )
                + SVG.templates.GradBlueLight4( colorids[5] )
            + SVG.closeDefinition();
      
  var x, y = y0;
  var h1, h2;
  var col_id, columns = [], r, c1, c2;
  for( var i = 0 ; i < n; i++ ){
      x = x0 + (( w - STKW )*i) + (STKW * i );
      c1 = colors[i];
      c2 = c1 === 1 ? 2 : 1;
      
      r = ratios[i];
      //col_id = svgid + "_" + i;
      console.log( r ); 
      h1 = h * r;
      h2 = h * (1-r);
      
      if( c1 === 0 ){
        c1 = 0;
        c2 = 0;
      }
      
      build += SVG.RectGradient(w,h,x,y,"" , 0, 20, col_id , stroke);
      build += SVG.RectGradient(w,h1,x,y,"Gradient"+ colorids[c1] , 0, 20, col_id , "");
      build += SVG.RectGradient(w,h2,x,y+(h1),"Gradient"+ colorids[c2] , 0, 20, col_id , "");
  }
  build += SVG.closeSVG();
  
  var svg = UT.HTMLToDiv( build, svgid ); 
      svg.style.position = "absolute";
      svg.style.display = "";
      svg.style.overflow = "visible";
    
    
  //var div = UT.newAbs("100%", "100%"); UT.setBG( div,"grey");
  //par.appendChild( div ); 
  par.appendChild( svg ); 
  return svg;
}

function MDF_A( w, h, x0, y0, colors ){
  var line = 1;
  var par = document.body;
  var r = 8;
  var n = colors.length;
  var STKW = 0.5;
  var stroke = 'stroke-linecap="round" stroke="lightgrey"  stroke-width="'+STKW+'"';
  
  var colorids = [ 
      GRADIENT_INDICES++, GRADIENT_INDICES++, GRADIENT_INDICES++, 
      GRADIENT_INDICES++, GRADIENT_INDICES++, GRADIENT_INDICES++ ];
  
  var svgid = "MDF_"+line+"_"+UT.count();
  var build = "";
      build +=SVG.openSVG( svgid, "100%", "100%")
            + SVG.openDefinition()
                + SVG.templates.White( colorids[0] )
                + SVG.templates.GradBlueLight0( colorids[1] )
                + SVG.templates.GradBlueLight1( colorids[2] )
                + SVG.templates.GradBlueLight2( colorids[3] )
                + SVG.templates.GradBlueLight3( colorids[4] )
                + SVG.templates.GradBlueLight4( colorids[5] )
            + SVG.closeDefinition();
      
  var x, y = y0;
  var col_id, c, columns = [];
  for( var i = 0 ; i < n; i++ ){
      x = x0 + (( w - STKW )*i) + (STKW * i );
      c = colors[i];
      col_id = svgid + "_" + i;
      build += SVG.RectGradient(w,h,x,y,"Gradient"+ colorids[c] , 0, 20, col_id , stroke);
  }
  build += SVG.closeSVG();
  
  var svg = UT.HTMLToDiv( build, svgid ); 
      svg.style.position = "absolute";
      svg.style.display = "";
      svg.style.overflow = "visible";
    
    
  //var div = UT.newAbs("100%", "100%"); UT.setBG( div,"grey");
  //par.appendChild( div ); 
  par.appendChild( svg ); 
  return svg;
}


// NEW
function ObjectMap(){
    var ob = {};
        ob.cnt = 0;
        ob.has = {};
        ob.newId = function(){ return ob.cnt++; } 
        ob.add = function( obj , el, id ){
            if( ob.has[id] === undefined ) ob.has[id] = {};
            ob.has[id].el     = el;
            ob.has[id].ob     = obj;
            obj.el            = el;
            obj.el.id         = id;
            obj.id            = id;
            return obj;
        }
        ob.addNew = function( el ){
            var id = "component"+ob.newId();
            var ob2 = newOb( id );
            return ob.add( ob2, el, id ); 
        }
        ob.get = function( name ){
            if( ob.has[name] !== undefined ) 
                return ob.has[name]; 
                else return undefined;
        }
        ob.getE = function( name ){
            if( ob.has[name] !== undefined ) 
                return ob.has[name].el; 
                else return undefined;
        }
        ob.getO = function( name ){
            if( ob.has[name] !== undefined ) 
                return ob.has[name].ob; 
                else return undefined;
        }
        return ob;
}



  function ServerListWidget( App ){
    
    


    
    var Ob = {};
        Ob.configure = function( App ){
          
            if( App != undefined ){
              
                App.CONST.ITEMS = [ "user","dest","value" ];
                var inputIds  = App.CONST.ITEMS;
                var appName   = App.name;
                var root      = App.getServer();
                var userId    = App.getUser();
                Ob.ROOT_DIR   = root;
                Ob.appName    = appName === undefined ? "UndefinedApp" : appName; 
                Ob.loadURL    = Ob.ROOT_DIR + Ob.appName + "/Loader/Loader?";
                Ob.saveURL    = Ob.ROOT_DIR + Ob.appName + "/Saver/Saver?";
                Ob.loginURL   = Ob.ROOT_DIR + Ob.appName + "/Login/Login?";
                Ob.inputIds   = inputIds === undefined ? [ "user","dest","value" ] : inputIds;
                
            }
          
        }
        Ob.configure( App );
        Ob.NAME = "ServerWidget";
        Ob.Ut = {};
        Ob.Ut.nextN = function(){ return UT.count(); };
        Ob.Ut.VERSION = "2.0";
        Ob.Ut.CHANGES = ["simplified", "added: login", "added: ifRootThenNoNameInAddress"];
        Ob.Ut.TODO = ["there is no method for loading here. add it"];
        
        Ob.id = Ob.NAME + Ob.Ut.nextN();
        Ob.saveObj = function( command , data ){
            //alert( command );
            var cmd = "save" + command;
            var inputIds    = Ob.inputIds;
            var root        = Ob.saveURL;
            var keys        = [ userId   , cmd , Ob.Ut.URIEncoderV1( data ) ];
            var action = function ( string ){ 	
                if( string === false ){ return false; }
            };
            Ob.GETRequest( keys , inputIds, action, root  );
        };
        Ob.login = function( username, pass, passed_action ){
            var DESTINATION_TESTING = "login";
            var cmd               = DESTINATION_TESTING;//"loadlist";
            var inputIds          = Ob.inputIds;
            var root              = Ob.loginURL;
            var keys              = [ username   , cmd , Ob.Ut.URIEncoderV1( pass ) ];
            var action            = function ( string ){ 	
                
                console.log("results: " + string ); 
                if( string === false ){ return false; }
                if( passed_action !== undefined ){
                    passed_action( string );
                }
                
            };
            Ob.GETRequest( keys , inputIds, action, root  );
        };
        Ob.loadCmdAction = function( command , fcn ){
            var userId      = "default";
            var cmd         = command;
            var inputIds    = Ob.inputIds;
            var root        = Ob.loadURL;
            
            //alert("!!!!!ROOT: "+root);
            var keys        = [ userId   , cmd , null ];
            
            var action = function ( string ){ 	
                
                
                console.log("PUT BACK INTO TRY AND CATCH: "  );
                fcn( JSON.parse( string ) );
                
                
                console.log("loaded: " + string );
                
                if( string === false || string.length == 0 ){ return false; }
                
                //console.log(  "!!!!!!!"+JSON.parse( string ) ); 
                
                try {
                  
                        //fcn( JSON.parse( string ) ); 
                        
                } catch (e) {
                    if (e instanceof SyntaxError) {
                        //alert("JSON SyntaxError"); 
                        
                        console.log("Handle JSON SyntaxError: data is missing or corrupt"); 
                        console.log("Attempt to revert."); 
                    } 
                }
                
           
           
      		      
      		      
      		      
            };
            Ob.GETRequest( keys , inputIds, action, root  );
        };
         Ob.logout = function(){
          
            // action -2 variables: string, and the event object
            var cmd               = "logout";//"loadlist";
            var inputIds          = Ob.inputIds;
            var root              = Ob.loginURL;
            var keys              = [ "default"   , cmd , null ];
            var action            = function ( string ){ 	
                console.log("results: " + string ); 
            };
            Ob.GETRequest( keys , inputIds, action, root  );
        };
        Ob.ifRootThenNoNameInAddress = function( root ){
            // FIX : if ROOT there is not APP name
            var idx = root.indexOf("ROOT");
            var ifRootThenNoAppName = idx != -1;
            if( ifRootThenNoAppName ){
                var a = idx;
                var b = idx + 4 + 1; // + 1 for backslash
                var buf = root;
                root =  buf.substring(0, a);
                root += buf.substring(b, buf.length );
            }
            return root;
        }
        Ob.GETRequest = function( key , inputIds, actions, root ){
            //alert("ROOT:"+root);
             
             root = Ob.ifRootThenNoNameInAddress( root ); 
            console.log( "!! " + root );
            var parameters = inputIds;
          	var href = root;
          	var address = "";
	          for( var i = 0; i < parameters.length; i++ ){
		            href += parameters[i] + "=" + key[i];
		            if(i < parameters.length - 1){ href += "&";}
		            address += parameters[i] + "=" + key[i];
	          }
	          var client = new XMLHttpRequest();
	          client.onreadystatechange = function () {
		            if(client.readyState == 4 && client.status == 200){
			              actions( client.responseText );
		            }
	          };
	          
	          //alert(href );
	          
	          //client.setRequestHeader('Authorization', 'Basic ' + btoa(unescape(encodeURIComponent("user" + ':' + "user"))));
	          console.log("connect to: " + href );
          	client.open("POST", href, true);
          	client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          	client.send( address ) ;
        };
    
        Ob.Ut.maxAttribute = function( objectArray , attribute ){  // finds the value of the object with the maximum attribute 
            var largest = -1;
            for( var i = 0; i < objectArray.length; i++ ){
                if( objectArray[i].id > largest ){ largest = objectArray[i][attribute]; }
            }
            return largest;
        }
        Ob.Ut.URIEncoderV1 = function( string ){
		      return JSON.stringify(string).
      		   replace(/["]/g,"!x!qu").
             replace(/[:]/g,"!x!cl").
             replace(/[[]/g,"!x!brl").
             replace(/[\]]/g,"!x!brr").
             replace(/[{]/g,"!x!crl").
             replace(/[" "]/g,"!x!sp").
             replace(/[,]/g,"!x!cm").
             replace(/[}]/g,"!x!crr").
             replace(/[<]/g,"!x!abl").
             replace(/[>]/g,"!x!abr").
             replace(/[&]/g,"!x!and").
             replace(/[\^]/g,"!x!exp").
             replace(/[/]/g,"!x!div").
             replace(/[?]/g,"!x!qst"). //NEW change from que due to naming collision
             replace(/[+]/g,"!x!add").
             replace(/[@]/g,"!x!at").
             replace(/[=]/g,"!x!eql").
             replace(/[#]/g,"!x!num").
             replace(/[|]/g,"!x!lin").
             replace(/[∆]/g,"!x!dlt").
             replace(/[∞]/g,"!x!inf").
             replace(/[∑]/g,"!x!sig").
             replace(/[∫]/g,"!x!int").
             replace(/[$]/g,"!x!dol").
             replace(/[%]/g,"!x!pct").
             replace(/[≤]/g,"!x!eol").
             replace(/[≥]/g,"!x!gol").
             replace(/[*]/g,"!x!ast");
        };
    return Ob;
}



function WebApp( name, root, secure, DNS ){
    var object = {};
    object.name = name;
    object.DNS = DNS !== undefined ? DNS : "";
    object.serverIs = 
    object.serverName = [
      "local",
      "aws",
      "dotcom"
    ];
    object.user = "default";
    object.serverSTANDARD = [
      "http://localhost:8080/",
      "http://"+object.DNS+".us-west-2.compute.amazonaws.com:8080/",
      "http://www.visape.com/"
    ];
    object.serverSSL = [
      "https://localhost:8443/",
      "https://"+object.DNS+".us-west-2.compute.amazonaws.com:8443/",
      "https://www.visape.com/"
    ];
    object.server = secure ? object.serverSSL :  object.serverSTANDARD ;
    object.getUser = function(){ return this.user; };
    object.root = object.server[0];
    object.getServer = function(){ return this.root; };
    object.setServer = function( input ){
        input = input + "";
        var local = input.indexOf("local") != -1 || input.indexOf("0") != -1;
        var aws = input.indexOf("aws") != -1 || input.indexOf("1") != -1;
        var dotcom = input.indexOf("dotcom") != -1 || input.indexOf("2") != -1;
        if( local ){ this.root = this.server[0]; }
        if( aws ){ this.root = this.server[1]; }
        if( dotcom ){ this.root = this.server[2]; }
    };
    object.CONST = {};
    if( root !== undefined ){ object.setServer( root );}
    return object;
}



// MAP.add()
function ComponentFury(){
    // requires MAP
    var ob = {};
        ob.cnt = 0;
        ob.n          = function(){ return ob.cnt++;}
        ob.Comp       = function(){
            var ob        = {};
                ob.i      = -1;
                ob.ch     = [];
                ob.fn     = [];  
                ob.was    = {};
                ob.rst    = function(){}
                ob.act    = function(){}
                ob.get    = function(){}
                ob.set    = function(){}
                ob.off   = function(){
                    ob.was.opacity = ob.el.style.opacity;
                    ob.el.style.opacity = 0;
                    return this;
                }
                ob.on    = function(){
                    ob.el.style.opacity = ob.was.popacity;
                    return this;
                }
                ob.offp   = function(){
                    ob.was.popacity = ob.pr.style.opacity;
                    ob.pr.style.opacity = 0;
                    return this;
                }
                ob.onp    = function(){
                    ob.pr.style.opacity = ob.was.popacity;
                    return this;
                }
                ob.on
            return ob;
        }
        ob.runParams = function( el, params ){
          
          if( params !== undefined ){
                    var isStyle, att, val, ATT = 0, VALUE_INDEX = 1, STYLE_BOOL_INDEX = 2;
                    for(var i = 0; i < params.length; i++ ){
                        att = params[i][ ATT ];
                        val = params[i][ VALUE_INDEX ];
                        isStyle = params[i][ STYLE_BOOL_INDEX ];
                        if( isStyle ) el.style[ att ] = val;
                        else el[ att ] = val;
                    }
                }
        }
        ob.ButtonFunctions = {};
        ob.ButtonFunctions.UploadChoose = function( div, hide_default ){
            var HIDE_FILE_INPUT = hide_default === undefined ? true : hide_default ;

            var container = document.createElement("div");
                //par.appendChild( container ); 
                UT.setH(container, "100px");
                UT.setW(container, "100%"); 
                UT.setBG(container, "transparent"); 
                UT.setPos(container, "relative"); 
                
            var count      = ob.n();
            var form       = UT.uploadForm( count ); 
            
            
            
            
            
            
            
            UT.setBG(form, "tranparent"); 
            UT.setWH(form, "100%"); 
            container.appendChild( form ); 
                
               
               
            var container2 = div;
            UT.setBG(container2, "white"); 
            UT.setW(container2, "300px"); 
            UT.setH(container2, "40px"); 
            UT.setMrgL(container2, "calc(50% - 150px)" ); 
            container2.el.style.borderRadius = "50px 50px 50px 50px";
            form.appendChild(container2.el);
  
                
            var fileinput_id        = "DATASET_FILE_"+count;
            var fileinput           = UT.HTMLToDiv('<input id="'+(fileinput_id)+'" type="file" name="file" required/>', fileinput_id ); 
            form.appendChild(fileinput);
               
          
            var label = UT.HTMLToDiv('<label id="uploadLabel_'+(count)+'" class="textGradient">CHOOSE FILE</label>', id = "uploadLabel_"+count ); 
            label.htmlFor = fileinput_id;
            
            label.style.display = "block" ; 
            label.style.padding = "10px";
            label.style.width = "100%" ;
            label.style.height = "100%" ;
            label.style.cursor = "pointer";
       
            
            
            
            if( HIDE_FILE_INPUT ) form.className += " hideFileInput";
       
            var ob2 = {};
                ob2.pr       = container;
                ob2.el       = container2;
                ob2.lb       = label;
                ob2.i        = count;
                ob2.ch       = [ fileinput ];
                ob2.get      = function(){
                    return ob2.lb.innerHTML;
                }
                ob2.set      = function( value ){
                    ob2.lb.innerHTML = value;
                }
            
            container2.el.appendChild( label ); 
            
            
            
            
            
            return ob2;
        }
        ob.ButtonChooseFile1 = function( filenameobject ){
          
              var Button                    = ob.ButtonMinimal1();
              var UploadFunctionality       = ob.ButtonFunctions.UploadChoose( Button );




              var obj         = {};
                  obj.el      = UploadFunctionality.el;
                  obj.pr      = UploadFunctionality.pr;
                  obj.lb      = UploadFunctionality.lb;
                  obj.i       = UploadFunctionality.i;
                  obj.get     = UploadFunctionality.get;
                  obj.set     = UploadFunctionality.set;
                  obj.ch      = [];
                  for(var i = 0 ; i < UploadFunctionality.ch.length; i++ ){
                    obj.ch.push( UploadFunctionality.ch[i] ); 
                  }
                  obj.getCh   = function( i ){ if( i >= 0 && i < obj.ch.length ) return obj.ch[i];}
                    
                    
                    
                    
                    
                  
               
                  
                return obj;
        }
        ob.ButtonSubmitUpload1 = function( fileobject ){
          

              var Button                    = ob.ButtonMinimal1();
              
              var obj                 = ob.Comp();
                  obj.el              = Button.el;
                  obj.pr              = Button.el.parentNode;
                  obj.setOnclick      = function(fcn ){ 
                    this.pr.onclick = function(){  fcn(); } 
                    return this;
                  }
        
            
            
                 return obj;
        }
         ob.ButtonLink = function( webaddress ){
            var newObject = ob.ButtonMinimal1();
            newObject.pr.style.border = "2px solid "+GREY_2;
            newObject.el.style.height = "40px";
            
            var eltext = document.createElement( "p" );
            eltext.innerHTML = "sdkfkjfd";
            eltext.style.position = "absolute";
            eltext.style.color = "blue";
            eltext.style.width = "100%";
            eltext.style.height = "30px";
            eltext.style.top = "-30px";
            eltext.style.textAlign = "center";
            eltext.style.fontSize = "30px";
            newObject.pr.appendChild( eltext ); 
            
            var id = "name"+UT.count();
            var anchor = UT.HTMLToDiv('<a id="'+( id )+'" href="'+(webaddress)+'"></a>', id );
            anchor.style.border = "0px solid black";
            anchor.style.height = "40px";
            anchor.style.width = "100%";
            anchor.style.position = "absolute";
            anchor.style.top = "0";
            newObject.pr.appendChild( anchor ); 
            anchor.style.display = "none";

            newObject.set = function( text ){
                eltext.innerHTML = text;
            }
            newObject.setTextL = function( value ){
                eltext.style.left = value;
            }
            newObject.setTextT = function( value ){
                eltext.style.top = value;
            }
            newObject.setURL = function( url ){
                  anchor.href = url;
            }
            newObject.off = function(){
                  anchor.style.display = "none";
            }
            newObject.on = function( url ){
                  anchor.style.display = "";
            }
            newObject.setFontFamilySizeColor = function( family, size, color ){
                  eltext.style.fontFamily = family; 
                  eltext.style.fontSize = size;
                  eltext.style.color = color;
            }
            newObject.getP = function(){
              return eltext;
            }
            return newObject;
          
        }
        ob.ButtonMinimal1 = function(){
            var count    = ob.cnt++;
            var id = "BUTTON_"+(count);
            var buttonMinimal  = UT.HTMLToDiv('<p id="'+(id)+'" class="">'+'</p>', id );
            
            var container = document.createElement("div");
                container.appendChild( buttonMinimal ); 
                UT.setH(container, "40px");
                UT.setW(container, "300px"); 
                
                UT.setBor(container, "1px solid white"); 
                UT.setPos( container, "relative" );
                UT.setMrgL( container, "calc(50% - 150px)" );
                
                container.className = "divRoundEdges";
                
                //container.htmlFor = document.getElementById("DATASET_FILE");
                
           
            var newObject = ob.Comp();
                newObject.el = buttonMinimal;
                newObject.pr = container;
                newObject.el.style.margin = "0";
                newObject.set = function( text ){
                  buttonMinimal.innerHTML = text;
                }
                
                    
                  
                    
              buttonMinimal.style.textAlign = "center" ; 
              buttonMinimal.style.textLine = "20px";
              
            buttonMinimal.style.color = "silver" ;
            buttonMinimal.style.cursor = "pointer";
            buttonMinimal.style.fontFamily = '"Montserrat", sans-serif';
            
            
            
            buttonMinimal.parentNode.style.color = "transparent";
      
            buttonMinimal.parentNode.style.backgroundColor = "white";
            buttonMinimal.parentNode.style.borderRadius = "50px 50px 50px 50px";
      
            
            
            buttonMinimal.style.fontFamily = '"Montserrat", sans-serif';
            
            //newObject.set("BBB");
            
            
                
                
            return newObject;
          
        }
        ob.svgC = function( params ){
            var tempID    = ob.cnt++;
            var svgC  = UT.HTMLToDiv('<p id="'+(tempID)+'" class="">'+'</p>', tempID );
            var container = document.createElement("div");
                container.appendChild( svgC ); 
                UT.setWH(container, "100%"); 
                UT.setBor(container, "1px solid transparent"); 
                
            var newObject = ob.Comp();
                newObject.el = svgC;
                container.style.backgroundImage = "url('data:image/svg+xml;base64,"+( CloudSVG64() )+"')";
                container.style.backgroundSize="contain";
                container.style.backgroundRepeat="no-repeat";
                container.style.backgroundPosition="center";
            return newObject;
            
        }
        ob.TextField1 = function(){
              var el            = newEl( "100px", "60px", "div");
              var tfield        = UT.TextField( el );
                  
                  
                  
                  W = 200;
                  UT.setW(      tfield, W+"px"); 
                  UT.setH(      tfield, "200px"); 
                  UT.setFontS(  tfield, "180px"); 
                  UT.setPos(    tfield, "relative"); 
                  UT.setMrgL(   tfield, "calc( 50% - "+(W/2)+"px)"); 
                  tfield.style.textAlign = "center";
                  tfield.style.borderRadius = "50px 50px 50px 50px";
                  tfield.style.border = 0;
                  tfield.style.outline = 0;
                  tfield.style.paddingBottom = "50px";
                  tfield.style.fontFamily = '"Poppins", sans-serif';
                  tfield.style.opacity = 0.8;
                  
                  
              
                  
              
              var container = document.createElement("div");
                  container.appendChild( tfield ); 
                  UT.setWH(container, "100%"); 
                  UT.setH(container, "100px"); 
              
              
                  //obj3.pr.style.border  = "1px solid black" ;
              
              
              
              
              
              
              
              
              
              
              
              
              
              var newObject     = ob.Comp();
                  newObject.el  = tfield;//el;
                  newObject.pr  = container;
              
              
              
              
              
               
                  
                  
              return newObject;
                  
                  
                  
        }
        ob.elTrans = function( el, params, clsName ){
                var tempID    = ob.cnt++;
                var textfade  = el; 

                var container = document.createElement("div");
                    container.appendChild( textfade ); 
                    UT.setWH(container, "100%"); 
                    UT.setBor(container, "1px solid transparent"); 
 
                var newObject = ob.Comp();
                    newObject.el = textfade;
                    newObject.pr = textfade.parentNode;
                    
                    newObject.act = function(){
                        newObject.el.style.animation = 'none';
                        newObject.el.offsetHeight; /* trigger reflow */
                        newObject.el.style.animation = null; //CROSSBROWSER
                    }
                ob.runParams( newObject.el, params );
                return newObject;
        }
        ob.textCTrans = function( text, params, clsName ){
                var tempID    = ob.cnt++;
                var textfade  = UT.HTMLToDiv('<p id="'+(tempID)+'" class="'+(clsName)+'">'+( text )+'</p>', tempID );

                var container = document.createElement("div");
                    container.appendChild( textfade ); 
                    UT.setWH(container, "100%"); 
                    UT.setBor(container, "1px solid transparent"); 
                    
 
                var newObject = ob.Comp();
                    newObject.el = textfade;
                    newObject.pr = textfade.parentNode;
                    
                    newObject.get = function(){
                      return this.el.innerHTML;
                    }
                    newObject.set = function( text ){
                      this.el.innerHTML = text;
                    }
                    newObject.act = function(){
                        newObject.el.style.animation = 'none';
                        newObject.el.offsetHeight; /* trigger reflow */
                        newObject.el.style.animation = null; //CROSSBROWSER
                    }
                    // newObject.el.onclick = function(){ newObject.act();} // TEST 
                    
                    
                    
                ob.runParams( newObject.el, params );
                return newObject;
        }
        ob.textCSlideUp = function( text, params ){
            var clsName = "";
            clsName += "textFadeUp ";
            clsName += "nohighlight ";
            return ob.textCTrans( text, params, clsName ); 
        }
        ob.textCSlideDown = function( text, params ){
            var clsName = "";
            clsName += "textFadeInDown ";
            clsName += "nohighlight ";
            return ob.textCTrans( text, params, clsName ); 
        }
        ob.textCSlideDownLong = function( text, params ){
            var clsName = "";
            clsName += "textFadeInDownLong ";
            clsName += "nohighlight ";
            return ob.textCTrans( text, params, clsName ); 
        }
         ob.divCSlideDownLong = function( el, params ){
            var clsName = "";
            clsName += "textFadeInDownLong ";
            clsName += "nohighlight ";
            return ob.elTrans( el, params, clsName ); 
        }
        ob.Popup1 = function(){
          
              var W = 550;
    
      
            var Container     = BlanketScreenWidget().init().on();
            
            var el            = newEl( W+"px", "300px", "div"); 
            UT.setBor( el, "10px solid "+GREY_1)
                                       
            
            
            
            
            Container.el.appendChild( el ); 
            
            
            
            
            
            
            UT.setBG(     el, "white"); 
            UT.setPos(    el, "relative"); 
            UT.setMrgL(   el, "calc( 50% - "+(W/2)+"px)"); 
            UT.setMrgT(   el, "108px"); 
            
            el.style.borderRadius = "10px ";
            
            

            
                                 
                          
            var newObject     = ob.Comp();
                newObject.pr  = Container.el;
                newObject.ch  = [];
                newObject.el  = el;
                
                
                
                
                
                
                newObject.pr.parentNode.removeChild( newObject.pr ); 
                
            return newObject;
            
          
        }
        ob.loadingPopup = function(){
          
            var W = 550;
            var newObject = ob.Popup1();
                
            //var Dimmed        = BlanketScreenWidget().init().on();
            
            var innerId       = "inner_"+UT.count();
           //alert("inner_id: "+ innerId); 
            var loading       = UT.HTMLToDiv('<div id="loading1" class="LoadingBox"><div class="LoadingCircle"></div><p id = "'+(innerId)+'" class="'
                                    +'LoadingTitle">Uploading...</p></div>', "loading1"); 
                   
                   
            var paragraph = UT.extractById( loading, innerId ); 
           
                   
                     
                     
                     
            var el = newObject.el;
            
            var Button  = COMPS.ButtonMinimal1();
            //Button.pr   = el.parentNode;
            
            
            el.appendChild( Button.el ); 
            UT.setBG( Button.pr, "black"); 
                
                
              
            newObject.set = function( text ){
                   
                  paragraph.innerHTML = text;
               
                
            
                  
            }
            newObject.off = function(){
              this.pr.style.display = "none";
            }   
            newObject.on = function(){
              this.pr.style.display = "";
            } 
           newObject.pr.style.position = "fixed";

                el.appendChild( loading ); 
                UT.setL( loading, "400px");   
                loading.style.left = "calc(50% - 75px)";                
                loading.style.top = "75px";                
                            
                          
                  
                          
            
                
                
                
            return newObject;
        }
        
    return ob;

}

function MJax( box ){
        Ob = {}; 
        Ob.id = "MJax"+UT.count();
        Ob.queue = MathJax.Hub.queue;
        Ob.el = UT.newAbs("100%", "100%"); 
        Ob.el.onclick = function(){
        
            alert( Ob.id );
            
        }        
        Ob.el.innerHTML = "$${}$$";
        Ob.hide = function () {Ob.el.style.visibility = "hidden"};
        Ob.show = function () {Ob.el.style.visibility = "visible"};
        Ob.queue.Push( function () {
          
          
        Ob.math = MathJax.Hub.getAllJax()[0];
            Ob.show();
        });

        Ob.setTeX = function( TeX ){
           Ob.queue.Push(
              Ob.hide,
              ["resetEquationNumbers",MathJax.InputJax.TeX],
              ["Text",Ob.math,"\\displaystyle{"+TeX+"}"],
              Ob.show
          );
        }
        Ob.el.id = Ob.id;
        box.appendChild( Ob.el ); 
        alert( Ob.id );
        return Ob;
}
    
function ResponsiveDynamicWidget2( n , PAID, parent, width ){
    handleUndefined(); 
    var Ob = newOb("ResponsiveDynamic");
        Ob.PAID_ACCOUNT_LAYOUT = PAID;
        Ob.AD_WIDTH = Ob.PAID_ACCOUNT_LAYOUT ? 0 : 320;
        Ob.CONTAINER = newEl( "calc( 100% - "+ Ob.AD_WIDTH +"px )" , "auto");
        Ob.marginL = 8, Ob.marginR = 8, Ob.marginB = ( Ob.marginR  ), Ob.marginT = Ob.marginB;
        Ob.boxW = width, Ob.boxH = 250;
        Ob.n = n;
        Ob.bgcolor = "white";
        Ob.ROWS = [], Ob.COLS = [];
        Ob.colsN, Ob.rowsN, Ob.distN;
        Ob.pr = parent;
        Ob.setBGColor = function( color ){ Ob.bgcolor = color;};
        Ob.getW = function(){ return Ob.marginL + Ob.boxW + Ob.marginR; };
        Ob.getMLR = function(){ return Ob.marginL + Ob.marginR; }
        Ob.getColN =function(){ var val = ( UT.getViewportW() - Ob.AD_WIDTH ) / Ob.getW(); if( val < 1 ){  return 1; } else { return Math.floor( val );}};
        Ob.getRowN =  function( cols ){ return Math.ceil( Ob.n  / cols  ) === Infinity ? 0 : Math.ceil( ( Ob.n ) / ( cols ) );};
        Ob.getDistN = function( rows ){ return Math.ceil( Ob.n  / rows ); };
        Ob.getCh = function(){ return Ob.COLS; };
        Ob.getPr = function(){ return Ob.pr; }
        Ob.getContainerDefaultW = function(){ return "calc( 100% - "+ Ob.AD_WIDTH +"px )"; };
        Ob.setContainerW = function( w ){ Ob.CONTAINER.style.width = w; };

        Ob.setH = function( H ){ 
            Ob.boxH = H;
            Ob.CONTAINER.style.height = ((1*Ob.boxH + 1*Ob.marginB) * Ob.rows)+"px";
            for( var i = 0; i < Ob.COLS.length; i++ ){ Ob.COLS[i].style.height = Ob.getH()+"px"; }
            for( var i = 0; i < Ob.ROWS.length; i++ ){ Ob.ROWS[i].style.height = Ob.getH()+"px"; }
        };
        Ob.setT = function( H ){ 
            Ob.CONTAINER.style.position = "absolute";
            Ob.CONTAINER.style.top = H+"px";
        };
        
        Ob.getH = function(){ return Ob.boxH; };
        Ob.Ut.alignRows = function(){
            for( var i = 0; i < Ob.ROWS.length; i++ ){
                Ob.ROWS[i].style.width = Ob.path[i] *Ob.getW()+ "px";
                Ob.ROWS[i].style.marginLeft = "calc( 50% - "+( Ob.path[i] *Ob.getW()/ 2)+"px )";
                Ob.ROWS[i].style.marginBottom = ( Ob.marginB )+"px";
                Ob.ROWS[i].style.height = Ob.getH() + "px";
            }
        };
        Ob.Ut.alignCols = function(){
            for( var i = 0, k = 0; i < Ob.path.length; i++ ){
                for( var j = 0; j < Ob.path[i]; j++, k++ ){
                    Ob.COLS[k].style.backgroundColor = Ob.bgcolor;
                    Ob.COLS[k].style.width = Ob.boxW+"px";
                    Ob.COLS[k].style.marginLeft = Ob.marginL + "px";
                    Ob.COLS[k].style.marginRight = Ob.marginR + "px";
                    Ob.COLS[i].style.height = Ob.getH() + "px";
                }
            }
        };
        Ob.Ut.fitContainerHeight = function(){ Ob.CONTAINER.style.height = ((1*Ob.boxH + 1*Ob.marginB) * Ob.rows)+"px"; };
        Ob.Ut.updateVariables = function(){
            Ob.colsN =  Ob.getColN();
            Ob.rows = Ob.getRowN( Ob.colsN );
            Ob.dist = Ob.getDistN( Ob.rows );
        };
        Ob.Ut.fitToScreen = function(){
            ensureSpaceRows();
            ensureSpaceCols();
            
            popColLengthsArr();
            
            appendRows();
            appendCols();
          
            hideUnusedRows();
            
            Ob.Ut.fitContainerHeight();
          
            function ensureSpaceRows(){
                while( Ob.ROWS.length < Ob.rows ){
                    var group = newEl( (Ob.getW()* Ob.dist ) + "px", Ob.boxH+"px" );
                    Ob.ROWS.push( group );
                }
            }
            
            function ensureSpaceCols(){
                while( Ob.COLS.length < Ob.n ){
                    var el = newEl( Ob.boxW+"px", Ob.boxH+"px");
                    Ob.COLS.push( el );
                }
            }
            
            function popColLengthsArr( ){
                Ob.path = []; var n = Ob.n;
                while( n > Ob.dist ){ Ob.path.push( Ob.dist ); n-= Ob.dist;}
                Ob.path.push( n );
            }
         
            // append rows + adjust widths
            function appendRows(){ for( var i = 0; i < Ob.ROWS.length; i++ ){ Ob.CONTAINER .appendChild( Ob.ROWS[i] ); } }
            
            function appendCols(){
              
                for( var i = 0, k = 0; i < Ob.path.length; i++ ){
                    for( var j = 0; j < Ob.path[i]; j++, k++ ){
                        Ob.ROWS[i].appendChild( Ob.COLS[k] );
                    }
                }
            };
            
            function hideUnusedRows(){
                for( var i = 0; i < Ob.rows; i++ ){
                    Ob.ROWS[i].style.height = Ob.boxH + "px";
                }
                for( var i = Ob.rows; i < Ob.ROWS.length; i++ ){
                    Ob.ROWS[i].style.height = 0;
                }
            }
        };
       
        Ob.init = function(){
            Ob.pr.appendChild( Ob.CONTAINER );
            Ob.payload();
        };
        Ob.State = function( min , fcn ){
            var state = {};
            state.min = min;
            state.atts = [];
            state.vals = [];
            state.fcn = fcn;
            return state;
        };
        
       
        Ob.states = [ ];
        Ob.substate = -1; 
        Ob.state;
        Ob.Ut.getCurrentState = function( min, breaks  ){
                var i;
                for( i = 0; i < breaks.length; i++ ){
                    if( min > breaks[i] ){  break; };
                }   if( i === breaks.length ){ i--; }

                for( var j = 0; j < Ob.states.length; j++ ){
                    if( Ob.states[j].min === breaks[i] ){ return Ob.states[j];}
                }
            }
           
        Ob.Ut.updateState = function( current, force ){ // force - updates now insread of on-event
          
          if( current === undefined ) return false;
          if( force   === undefined ){ force = false;} else {Ob.substate = undefined; Ob.state = undefined;}
          var define = Ob.state === undefined || current !== undefined && current.min !== Ob.state.min
          if( define || force ){
                Ob.state = current;
                Ob.state.fcn();
            }
        };
        Ob.Ut.getBreaks = function( states ){ 
                var build = [];
                for( var i = 0; i < states.length; i++ ){
                    build.push( states[i].min );
                }
              return build;
        };
        Ob.Cn = {};
        Ob.Cn.SINGLE_STRETCH = function(){
          
          Ob.boxW = COMPONENT_WIDTH = 800;
           
          var WIDTH = 400;
          
          var ZERO_POINT = 0;
          
          var BREAK_POINT_0 = WIDTH + Ob.marginL + Ob.marginR;
          
          var BREAK_POINT_1 = BREAK_POINT_0 * (2);
          
          var st0 = Ob.State( ZERO_POINT , function(){
              var SINGLE = 0;
              Ob.CONTAINER.style.width = "calc(100%)";
              Ob.Ut.updateVariables();
              Ob.Ut.fitToScreen();
              for(var i = 0; i < Ob.COLS.length; i++ ){
                  Ob.COLS[i].style.backgroundColor = Ob.bgcolor;
                  Ob.getCh()[ i ].parentNode.style.marginBottom = "6px";
                  Ob.getCh()[ i ].style.width = "100%";
                  Ob.getCh()[ i ].style.height = Ob.getH()+"px";
                  Ob.getCh()[ i ].style.marginLeft = Ob.marginL + "px";
                  Ob.getCh()[ i ].style.marginRight = Ob.marginR + "px";
                  Ob.getCh()[ i ].parentNode.style.width = "calc( 100% - "+ Ob.getMLR() +"px )"; 
              }
              for( var i = 0; i < Ob.ROWS.length; i++ ){
                  Ob.ROWS[i].style.height = Ob.getH()+"px";
              }
              
              
            //  var MARGIN = (8);
            //  var W = UT.getViewportW() - MARGIN*2;
            //  var H1 = Ob.getH();
              
              //maintainCanvasRatio(  can, W , H1, 4 );
          });
          
          var st1 = Ob.State( BREAK_POINT_0 + Ob.AD_WIDTH, function(){
              var SINGLE = 0;
              Ob.CONTAINER.style.width = Ob.getContainerDefaultW();
              Ob.Ut.updateVariables();
              Ob.Ut.fitToScreen();
              
              for(var i = 0; i < Ob.COLS.length; i++ ){
                  Ob.COLS[i].style.backgroundColor = Ob.bgcolor;
                  Ob.getCh()[ i ].parentNode.style.marginBottom = "6px";
                  Ob.getCh()[ i ].style.width = "100%";
                  Ob.getCh()[ i ].style.height = Ob.getH()+"px";
                  Ob.getCh()[ i ].parentNode.style.width = "calc( 100% - "+ Ob.getMLR() +"px )"; 
                  Ob.getCh()[ i ].style.marginLeft = Ob.marginL + "px";
              }
              for( var i = 0; i < Ob.ROWS.length; i++ ){
                  Ob.ROWS[i].style.height = Ob.getH()+"px";
              }
          });
          Ob.states = [ st0, st1 ];
          Ob.payload();
          return Ob;
        };
         Ob.Cn.SPLIT = function(){
          
          Ob.boxW = WIDTH = 350;
          
          var ZERO_POINT = 0;
          
          var BREAK_POINT_0 = WIDTH + Ob.marginL + Ob.marginR;
          
          var BREAK_POINT_1 = BREAK_POINT_0 * (2);
          
          var st0 = Ob.State( ZERO_POINT , function(){
              Ob.substate = -1;
              var SINGLE = 0;
              Ob.CONTAINER.style.width = "calc(100%)";
              Ob.CONTAINER.style.height = "auto";
              Ob.Ut.updateVariables();
              Ob.Ut.fitToScreen();
              for(var i = 0; i < Ob.COLS.length; i++ ){
                  //Ob.COLS[i].style.backgroundColor = Ob.bgcolor;
                  Ob.getCh()[ i ].parentNode.style.marginBottom = "6px";
                  Ob.getCh()[ i ].style.width = "calc(100% - 16px)";
                  Ob.getCh()[ i ].style.marginLeft = "8px";
                  Ob.getCh()[ i ].style.marginRight = Ob.marginR + "px";
                  Ob.getCh()[ i ].parentNode.style.width = "100%"; 
                 // Ob.getCh()[ i ].style.backgroundColor = Ob.bgcolor; 
              }
              for( var i = 0; i < Ob.ROWS.length; i++ ){
                  Ob.ROWS[i].style.marginLeft = 0;
                  Ob.ROWS[i].style.left = "0";
                  Ob.ROWS[i].style.marginBottom = "";
                  
              }
              
              Ob.CONTAINER.style.height = "auto";
              Ob.ROWS[0].style.height = "200px";
              Ob.getCh()[ 0 ].style.height = "200px";
              if( TITLE_EL_0 !== null ){ TITLE_EL_0.style.top  = "20px"; }
              
              
          });    

          var st1 = Ob.State( BREAK_POINT_1, function(){
              console.log( "2222");
              Ob.substate = -1;
              var SINGLE = 0;
              Ob.CONTAINER.style.width = Ob.getContainerDefaultW();
              Ob.Ut.updateVariables();
              Ob.Ut.fitToScreen();
              for(var i = 0; i < Ob.COLS.length; i++ ){
                  //Ob.COLS[i].style.backgroundColor = Ob.bgcolor;
                  
                  Ob.getCh()[ i ].style.marginRight = 0;
                  Ob.getCh()[ i ].parentNode.style.width = "calc( 100% - "+ Ob.getMLR() +"px )"; 
                  Ob.getCh()[ i ].style.width = "calc(50% - 8px)";
                  Ob.getCh()[ i ].style.marginLeft = 0;
                 // Ob.getCh()[ i ].style.backgroundColor = Ob.bgcolor;
              }
              for( var i = 0; i < Ob.ROWS.length; i++ ){
                  Ob.ROWS[i].style.marginLeft = 0;
                  Ob.ROWS[i].style.width = "100%";
                  Ob.ROWS[i].style.left = "8px";
                  Ob.ROWS[i].style.marginBottom = "0";
              }
              
          
              
              Ob.ROWS[0].style.height = "calc(100% - 8px)";
              Ob.getCh()[ 0 ].style.height = "100%";
              if( TITLE_EL_0 !== null ){ TITLE_EL_0.style.top  = "130px"; }
              
          });
          Ob.states = [ st0, st1 ];
      
          Ob.payload();
          return Ob;
        };
        Ob.Cn.SINGLE_800 = function(){
          
          Ob.boxW = COMPONENT_WIDTH = 800;
           
          var WIDTH = 400;
          
          var ZERO_POINT = 0;
          
          var BREAK_POINT_0 = WIDTH + Ob.marginL + Ob.marginR;
          
          var BREAK_POINT_1 = BREAK_POINT_0 * (2);
          
          var st0 = Ob.State( ZERO_POINT , function(){
              var SINGLE = 0;
              Ob.CONTAINER.style.width = "calc(100%)";
              Ob.Ut.updateVariables();
              Ob.Ut.fitToScreen();
              for(var i = 0; i < Ob.COLS.length; i++ ){
                  Ob.COLS[i].style.backgroundColor = Ob.bgcolor;
                  Ob.getCh()[ i ].parentNode.style.marginBottom = "6px";
                  Ob.getCh()[ i ].style.width = "100%";
                  Ob.getCh()[ i ].style.marginLeft = Ob.marginL + "px";
                  Ob.getCh()[ i ].style.marginRight = Ob.marginR + "px";
                  Ob.getCh()[ i ].parentNode.style.width = "calc( 100% - "+ Ob.getMLR() +"px )"; 
              }
          });
          
          var st1 = Ob.State( BREAK_POINT_0 + Ob.AD_WIDTH, function(){
              var SINGLE = 0;
              Ob.CONTAINER.style.width = Ob.getContainerDefaultW();
              Ob.Ut.updateVariables();
              Ob.Ut.fitToScreen();
              
              for(var i = 0; i < Ob.COLS.length; i++ ){
                  Ob.COLS[i].style.backgroundColor = Ob.bgcolor;
                  Ob.getCh()[ i ].parentNode.style.marginBottom = "6px";
                  Ob.getCh()[ i ].style.width = "100%";
                  Ob.getCh()[ i ].parentNode.style.width = "calc( 100% - "+ Ob.getMLR() +"px )"; 
                  Ob.getCh()[ i ].style.marginLeft = Ob.marginL + "px";
                  Ob.getCh()[ i ].style.backgroundColor = Ob.bgcolor;
              }
          });
          
          var st2 = Ob.State( BREAK_POINT_1 + Ob.AD_WIDTH, function(){
              var ANY = 0;
              Ob.Ut.updateVariables();
              Ob.Ut.fitToScreen();
              Ob.CONTAINER.style.width = Ob.getContainerDefaultW();
              for(var i = 0; i < Ob.COLS.length; i++ ){
                  Ob.COLS[i].style.backgroundColor = Ob.bgcolor;
                  Ob.getCh()[ i ].parentNode.style.width = "calc( 100% - "+ Ob.getMLR() +"px )"; 
                  Ob.getCh()[ i ].parentNode.style.marginBottom = "6px";
                  Ob.getCh()[ i ].style.width = (800 + Ob.marginL + Ob.marginR )+"px";
                  Ob.getCh()[ i ].style.marginLeft = "calc( 50% - "+ ( (800 / 2 )  ) +"px )";
                  Ob.getCh()[ i ].style.marginRight = 0;
                  Ob.getCh()[ i ].style.backgroundColor = Ob.bgcolor;
              }
          });
          
          Ob.states = [ st0 , st1 , st2 ];
          Ob.payload();
          return Ob;
        };
        Ob.Cn.MULTI_400 = function(){
          
          Ob.boxW = WIDTH = 400;
          
          var ZERO_POINT = 0;
          
          var BREAK_POINT_0 = WIDTH + Ob.marginL + Ob.marginR;
          
          var BREAK_POINT_1 = BREAK_POINT_0 * (2);
          
          var st0 = Ob.State( ZERO_POINT , function(){
              Ob.substate = -1;
              var SINGLE = 0;
              Ob.CONTAINER.style.width = "calc(100%)";
              Ob.Ut.updateVariables();
              Ob.Ut.fitToScreen();
              for(var i = 0; i < Ob.COLS.length; i++ ){
                  Ob.COLS[i].style.backgroundColor = Ob.bgcolor;
                  Ob.getCh()[ i ].parentNode.style.marginBottom = "6px";
                  Ob.getCh()[ i ].style.width = "100%";
                  Ob.getCh()[ i ].style.marginLeft = Ob.marginL + "px";
                  Ob.getCh()[ i ].style.marginRight = Ob.marginR + "px";
                  Ob.getCh()[ i ].parentNode.style.width = "calc( 100% - "+ Ob.getMLR() +"px )"; 
                  Ob.getCh()[ i ].style.backgroundColor = Ob.bgcolor; 
              }
          });
          
          var st1 = Ob.State( BREAK_POINT_0 + Ob.AD_WIDTH, function(){
              Ob.substate = -1;
              var SINGLE = 0;
              Ob.CONTAINER.style.width = Ob.getContainerDefaultW();
              Ob.Ut.updateVariables();
              Ob.Ut.fitToScreen();
              for(var i = 0; i < Ob.COLS.length; i++ ){
                  Ob.COLS[i].style.backgroundColor = Ob.bgcolor;
                  Ob.getCh()[ i ].parentNode.style.marginBottom = "6px";
                  Ob.getCh()[ i ].style.width = "100%";
                  Ob.getCh()[ i ].parentNode.style.width = "calc( 100% - "+ Ob.getMLR() +"px )"; 
                  Ob.getCh()[ i ].style.marginLeft = Ob.marginL + "px";
                  Ob.getCh()[ i ].style.backgroundColor = Ob.bgcolor;
              }
              for( var i = 0; i < Ob.ROWS.length; i++ ){
                  Ob.ROWS[i].style.marginLeft = 0;
              }
          });
          
        var st2 = Ob.State( BREAK_POINT_1 + Ob.AD_WIDTH , function(){ //
                //console.log("\t   STATE 2");
               // console.log("\t   "+  (BREAK_POINT_1 + Ob.AD_WIDTH));
                if( !OVERRIDE_BREAKPOINT() ) return false;
                
                 //console.log("\t   STATE 2:made it");
                 
                 
                Ob.CONTAINER.style.width = Ob.getContainerDefaultW();
                Ob.CONTAINER.style.height = "auto";
                Ob.Ut.updateVariables();
                Ob.Ut.fitToScreen();
                for( var i = 0; i < Ob.COLS.length; i++ ){
                    Ob.COLS[i].style.backgroundColor = Ob.bgcolor;
                    Ob.COLS[i].style.width = Ob.boxW+"px";
                    Ob.COLS[i].style.marginLeft = Ob.marginL + "px";
                    Ob.COLS[i].style.marginRight = Ob.marginR + "px";
                    Ob.COLS[i].style.height = Ob.getH() + "px";
                }
                
                for( var i = 0; i < Ob.ROWS.length; i++ ){
                  Ob.ROWS[i].style.marginLeft = "calc( 50% - "+( Ob.path[i] *Ob.getW()/ 2)+"px )";
                  Ob.ROWS[i].style.marginBottom= "6px";
                  //Ob.ROWS[i].style.width = "1138px";
                  Ob.ROWS[i].style.width = "calc( 100%  + 22px )"; //"1138px;
                  
                  
                  ////alert(Ob.ROWS[i].style.width);
                }
                function OVERRIDE_BREAKPOINT(){
                    var COLUMNS_PER_ROW = (UT.getViewportW() - Ob.AD_WIDTH) / BREAK_POINT_0;
                    Ob.state = undefined;
                    if( Ob.substate !== Math.floor(COLUMNS_PER_ROW) ){
                        Ob.substate = Math.floor(COLUMNS_PER_ROW);
                        return true;
                    } 
                    else return false;
                };
          });
          Ob.states = [ st0 , st1, st2 ];
          Ob.payload();
          return Ob;
        };
        Ob.Cn.YOUTUBE = function(){
          var ZERO_POINT = 0;
          Ob.boxW = WIDTH = 430, WIDTH2 = 640, WIDTH3 = 850;
          Ob.boxH = HEIGHT = 240, HEIGHT2 = 360, HEIGHT3 = 480;

          var st0 = Ob.State( ZERO_POINT , function(){
              
                    
          
              var SINGLE = 0;
              Ob.CONTAINER.style.width = "calc(100%)";
              Ob.Ut.updateVariables();
              //console.log("entered the rubicant0");
              Ob.Ut.fitToScreen();
              for(var i = 0; i < Ob.COLS.length; i++ ){
                  Ob.COLS[i].style.backgroundColor = Ob.bgcolor;
                  Ob.getCh()[ i ].style.width = "100%";
                  Ob.getCh()[ i ].style.height = (HEIGHT) + "px";
                //  Ob.getCh()[ i ].parentNode.style.marginBottom = "6px";
                //  Ob.getCh()[ i ].style.marginLeft = Ob.marginL + "px";
                //  Ob.getCh()[ i ].style.marginRight = Ob.marginR + "px";
                //  Ob.getCh()[ i ].parentNode.style.width = "calc( 100% - "+ Ob.getMLR() +"px )"; 
              }
              
        
                
          });
        
          
          var st1 = Ob.State( WIDTH + Ob.AD_WIDTH, function(){
              console.log("entered the rubicant1");
              Ob.CONTAINER.style.width = "calc(100%)";
              Ob.Ut.updateVariables();
              Ob.Ut.fitToScreen();
              for(var i = 0; i < Ob.COLS.length; i++ ){
                  Ob.COLS[i].style.backgroundColor = Ob.bgcolor;
                  Ob.getCh()[ i ].style.width = WIDTH + "px";
                  Ob.getCh()[ i ].style.height = (HEIGHT) + "px";
              }
          });
          
          var st2 = Ob.State( WIDTH2 + Ob.AD_WIDTH, function(){
              console.log("entered the rubicant2");
              Ob.CONTAINER.style.width = "calc(100%)";
              Ob.Ut.updateVariables();
              Ob.Ut.fitToScreen();
              for(var i = 0; i < Ob.COLS.length; i++ ){
                  Ob.COLS[i].style.backgroundColor = Ob.bgcolor;
                  Ob.getCh()[ i ].style.width = WIDTH2 + "px";
                  Ob.getCh()[ i ].style.height = HEIGHT2 + "px";
                  
              }
          });
          
          var st3 = Ob.State( WIDTH3 + Ob.AD_WIDTH, function(){
              console.log("entered the rubicant3");
              Ob.CONTAINER.style.width = "calc(100%)";
              Ob.Ut.updateVariables();
              Ob.Ut.fitToScreen();
              for(var i = 0; i < Ob.COLS.length; i++ ){
                  Ob.COLS[i].style.backgroundColor = Ob.bgcolor;
                  Ob.getCh()[ i ].style.width = WIDTH3 + "px";
                  Ob.getCh()[ i ].style.height = HEIGHT3 + "px";
              }
          });
          
          
          
          
          
          
          Ob.states = [ st0, st1, st2, st3 ];
          Ob.payload();
          return Ob;
        };
        Ob.isSafari = function(){
            navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
            navigator.userAgent && !navigator.userAgent.match('CriOS');
            // source: https://stackoverflow.com/questions/7944460/detect-safari-browser
        }
        Ob.payload = function( force ){ 
            //console.log(  UT.getViewportW() );
            if( force === undefined ){ force = false;  }
           
            var viewportW = UT.getViewportW();
            var breaks =  UT.sortDsc( Ob.Ut.getBreaks( Ob.states ) );
            var current = Ob.Ut.getCurrentState( viewportW, breaks );
            
            Ob.Ut.updateState( current , force );
         
        };
        Ob.ex = function(){
          console.log("USAGE EXAMPLE:");
          console.log("var UT = UtCrossBrowser();");
          console.log("var AD = extendAdsenseWidget310( AdsenseWidget310() );");
          console.log("var OB1 = ResponsiveDynamicWidget( 1 );");
          console.log("var MAIN_AREA = ResponsiveDynamicWidget( 7 );");
          console.log('UT.addEvent( window, "onresize", function(){');
          console.log('\tOB1.payload();');
          console.log('\tMAIN_AREA.payload();');
          console.log('\tAD.payload( OB1 );');
          console.log('});');
          console.log('NOTE_01: AD.payload only needs one of the containers to be able to deflate properly');
        };
        
        Ob.init();
        
        function handleUndefined(){
            if( width === undefined ){ width = 400; }
            if( n === undefined ){ n = 1; }
            if( PAID === undefined ){ PAID = false; }
            if( parent === undefined ){ parent = PARENT_DIV; }
        };
        Ob.newCh = function(){
          
          Ob.n += 1;
          Ob.payload();
          return Ob.getCh()[Ob.getCh().length-1];
        }
        Ob.version = 1.0;
    return Ob; 
};

function UtCrossBrowser(){
  var Ob = newOb("UtCrossBrowser");
  Ob.addEvent =  function( object, type, fcn ) {
      if (object === null || typeof( object ) == 'undefined') return;
      if (object.addEventListener) {
          var remove_on_keyword = type.substring( 2, type.length );
          object.addEventListener( remove_on_keyword , fcn, false );
      } else if (object.attachEvent) {
          object.attachEvent( type, fcn );
      } else {
          object[ type ] = fcn;
      }
  };
  Ob.getClipboardText = function(e){
            var pastedText = undefined;
            if (window.clipboardData && window.clipboardData.getData) { // IE
              pastedText = window.clipboardData.getData('Text');
            } else if (e.clipboardData && e.clipboardData.getData) {
              pastedText = e.clipboardData.getData('text/plain');
            }
            return pastedText;
  }
  Ob.getTextFromURL = function( address, fcn ){
                    var f = new XMLHttpRequest();
                    f.open("GET", address, false);
                    f.onreadystatechange = function (){
                        if(f.readyState === 4){
                            if(f.status === 200 || f.status == 0){
                              fcn(  f.responseText);
                            }
                        }
                    } 
                    f.send(null);
  }
  Ob.count = function(){
      return GLOBAL_COUNT++;
  }
  Ob.URLToFilename = function(){
      var vals    = (window.location.href).split("?")
      var filename = vals[vals.length-1].trim();
      return filename;
  }
  Ob.seq = function( from, to , step ){
    if( step === undefined ) step = 1;
    var values = [];
    for(var i = from; i < to; i+= step){
      values.push(i); 
    }
    return values; 
  }
  Ob.sum = function( array ){
      var total = 0;
      // get total
      for(var i = 0 ; i < array.length; i++ ){
          total += array[i];
      }
      return total; 
  }
  Ob.rep = function( val , times ){
    var values = [];
    for(var i = 0; i < times; i++){ // was times+1
      values.push(val); 
    }
    return values; 
  }
  Ob.viewports = {};
  Ob.viewports.ids = [];
  Ob.viewports.widths = [];
  Ob.viewports.init = function(){
      var vp;
      for( var i = 0; i < Ob.viewports.ids.length; i++ ){
          vp = Ob.viewports.ids[i];
          Ob.viewports[ vp ].run();
      }
  };
  Ob.sortAsc = function( array ){ return array.sort(function (a, b) {  return a - b;  }); };
  Ob.sortDsc = function( array ){ return array.sort(function (a, b) {  return b - a;  }); };
  Ob.addViewportListener = function( viewportId , viewportMinW, fcn ){
      if( Ob.viewports[ viewportId ] === undefined ){ 
          Ob.viewports[ viewportId ] = {};  
          Ob.viewports[ viewportId ].w = viewportMinW;
          Ob.viewports[ viewportId ].fcn = fcn;
          Ob.viewports[ viewportId ].run = function(){ 
              var curW = Ob.getViewportW(), otherW;
              var upperBoundMet = viewportMinW < curW;
              var lowerBoundMet = true;
              for( var i = 0; i < Ob.viewports.widths.length; i++ ){
                  otherW = Ob.viewports.widths[i];
                  if( otherW ==  viewportMinW ){ continue; } 
                  lowerBoundMet = ( otherW < curW && otherW < viewportMinW ) || ( otherW > curW );
                  if( !lowerBoundMet ){ break; }
              }
              if( lowerBoundMet && upperBoundMet ){ 
                  if(  Ob.viewports.is === undefined || Ob.viewports.is*1 !== viewportMinW*1 ){
                       Ob.viewports.is = viewportMinW;
                       Ob.viewports[ viewportId ].fcn();
                  }
              }
          };
          if( Ob.viewports.ids.length === 0 ){
              Ob.viewports.is = undefined;
              Ob.addEvent( window, "onresize", function(){
                  var vp;
                  for( var i = 0; i < Ob.viewports.ids.length; i++ ){
                        vp = Ob.viewports.ids[i];
                        Ob.viewports[ vp ].run();
                  }
              });
          }
          Ob.viewports.ids.push( viewportId );
          Ob.viewports.widths.push( viewportMinW );
          Ob.sortAsc( Ob.viewports.widths );
      }
      //for( var i = 0; i < fcns.length; i++ ){ Ob.viewports[ viewportId ].fcns.push( fcns[i] ); }
  };
  Ob.setBGSVG = function ( el, svg, scale ){
      if(scale == undefined) scale = "100%";
      el.style.backgroundImage = "url('data:image/svg+xml;base64,"+( svg )+"')";
      el.style.backgroundSize=scale;
      el.style.backgroundRepeat="no-repeat";
      el.style.backgroundPosition="center";
  }
  Ob.setBGSVGnot64 = function ( el, svg, scale ){
      if(scale == undefined) scale = "100%";
      el.style.backgroundImage = "url('data:image/svg+xml;utf8,"+( svg )+"')";
      el.style.backgroundSize=scale;
      el.style.backgroundRepeat="no-repeat";
      el.style.backgroundPosition="center";
  }
    Ob.setBGSVGUrl = function ( el, svg, scale ){
      if(scale == undefined) scale = "100%";
      el.style.backgroundImage = "url("+( svg )+")";
      el.style.backgroundSize=scale;
      el.style.backgroundRepeat="no-repeat";
      el.style.backgroundPosition="center";
  }
  Ob.extract = function( htmlxmlorsvg ){
      var test        = newEl("50px","100%","div" );
      test.style.opacity = 0;
      test.innerHTML = htmlxmlorsvg;
      document.body.appendChild(test);   
      var svg4 =     test.childNodes[2];
      test.removeChild(svg4); 
      document.body.removeChild(test); 
      return svg4;
  }
  Ob.extractById = function( div, subdiv_id ){
      var prev = div.style.display;
      div.style.display = "none"
      document.body.appendChild( div ); 
      var el = document.getElementById( subdiv_id );
      document.body.removeChild( div ); 
      div.style.display = prev;
      return el;
  }
  Ob.regX = {}
  Ob.regX.removeSpaces      = function( string ){ return string.replace(/\s+/g,'');}
  Ob.getViewportW           = function(){ return Math.max( document.documentElement.clientWidth,   window.innerWidth  || 0 ); };
  Ob.getViewportH           = function(){ return Math.max( document.documentElement.clientHeight,  window.innerHeight || 0 ); };
  Ob.setBG = function( el, color ){ (el.el || el).style.backgroundColor = color;}
  Ob.setVerticalAlign = function( el, color ){ (el.el || el).style.verticalAlign = color;}
  Ob.setDsp = function( el, color ){ (el.el || el).style.display = color;}
  Ob.onC = function( el, color ){ (el.el || el).onclick = color;}
  Ob.setC = function( el, color ){ (el.el || el).style.color = color;}
  Ob.setH = function( el, color ){ (el.el || el).style.height = color;}
  Ob.setW = function( el, color ){ (el.el || el).style.width = color;}
  Ob.setWH = function( el, width, height ){  Ob.setH( el, width ); Ob.setH( el, height); }
  Ob.setL = function( el, color ){ (el.el || el).style.left = color;}
  Ob.setR = function( el, color ){ (el.el || el).style.right = color; Ob.setL(el,""); }
  Ob.rmvMargins = function( el ){ var d = (el.el || el); d.style.margin = 0; d.style.marginTop = 0; d.style.marginBottom = 0; d.style.marginLeft = 0; d.style.marginRight = 0;}
  Ob.setPos = function( el, color ){ (el.el || el).style.position = color;}
  Ob.setT = function( el, color ){ (el.el || el).style.top = color;}
  Ob.setO = function( el, color ){ (el.el || el).style.opacity = color;}
  Ob.setFontS = function( el, color ){ (el.el || el).style.fontSize = color;}
  Ob.setText = function( el, color ){  (el.el || el).innerHTML = color; }
  Ob.setMrg  = function( el, margin ){ (el.el || el).style.margin = margin; }
  Ob.setMrgL = function( el, margin ){ (el.el || el).style.marginLeft = margin; }
  Ob.setMrgR = function( el, margin ){ (el.el || el).style.marginRight = margin; }
  Ob.setMrgT = function( el, margin ){ (el.el || el).style.marginTop = margin; }
  Ob.setMrgB = function( el, margin ){ (el.el || el).style.marginBottom = margin; }
  Ob.setPad  = function( el, padding ){ (el.el || el).style.padding = padding; }
  Ob.setPadL = function( el, padding ){ (el.el || el).style.paddingLeft = padding; }
  Ob.setPadR        = function( el, padding ){ (el.el || el).style.paddingRight = padding; }
  Ob.setPadT        = function( el, padding ){ (el.el || el).style.paddingTop = padding; }
  Ob.setPadB        = function( el, padding ){ (el.el || el).style.paddingBottom = padding; }
  Ob.setTextAlign   = function(el, input ){ (el.el || el).style.textAlign = input; }
  
  Ob.setResize = function( el, color ){ (el.el || el).style.resize = color; }
  Ob.setNoEdit = function( el ){ var div = (el.el || el); div.readOnly = true; div.style.outline = "none"; UT.setResize( div, "none" ); }
  Ob.setBor = function( el, color ){ (el.el || el).style.border = color;}
  Ob.setBorT = function( el, color ){ (el.el || el).style.borderTop = color;}
  Ob.setBorB = function( el, color ){ (el.el || el).style.borderBottom = color;}
  Ob.setBorL = function( el, color ){ (el.el || el).style.borderLeft = color;}
  Ob.setBorR = function( el, color ){ (el.el || el).style.borderRight = color;}
  Ob.setB = function( el, color ){ (el.el || el).style.bottom = color;}
  Ob.callback = function( fcns, times ){
  // * fcns     - array of functions to be run at the corresponding index in the time array
  // * times    - start times for corresponding function indices - times scale: 1000 equals 1 second, 1 equals a millisecond
  // * example  - callback([fnc1, fnc2], [time1 = 200, time2 = 700]); 
   if (fcns.length <= 0)
        return;
    (function chain(i) {
        if (i >= fcns.length || typeof fcns[i] !== 'function')
            return;
        window.setTimeout(function() {
            fcns[i]();
            chain(i + 1);
        }, times[i]);
    })(0);
  }
  Ob.loop = function( args, times ) {
    if (args.length <= 0)
        return;
    (function chain(i) {
        if (i >= args.length || typeof args[i] !== 'function')
            return;
        window.setTimeout(function() {
            args[i]();
            chain(i + 1);
        }, times[i]);
    })(0);
  }
  Ob.setCur = function( el, color ){ (el.el || el).style.cursor = color;}
  Ob.addButton = function( el, L,T,W,H ){ 
    var par = (el.el || el);
    var div =  document.createElement("div"); 
    Ob.setCur( div, "pointer"); 
    Ob.setPos( div, "absolute"); 
    Ob.setL( div, L+""); 
    Ob.setT( div, T+""); 
    Ob.setW( div, W+""); 
    Ob.setH( div, H+"");
    par.appendChild( div );
    return div;
  }
  Ob.quickBtn = function(){
        var el = Ob.newAbs("50px", "50px");
        Ob.setBG( el, "black" );
        Ob.setPos( el, "relative"); 
        Ob.setDsp( el, "inline-block"); 
        Ob.setCur( el, "pointer"); 
        B.appendChild( el ); 
        return el;
  }
  Ob.newAbs = function( w, h ){
          var id = "container"+(Ob.count());
          var el = newEl( "0" , "0", "div");
          el.style.backgroundColor = "white";
          el.style.height   = h;
          el.style.left   = 0;
          el.style.top    = 0;
          el.style.width    = w;
          el.style.position  = "absolute";
          el.id             = id;
          //el.className      = "shadowEffect1";
          return el;
      }
      Ob.newRel = function( w, h ){
          var id = "container"+(Ob.count());
          var el = newEl( "0" , "0", "div");
          el.style.backgroundColor = "white";
          el.style.height   = h;
          el.style.width    = w;
          el.style.display  = "block";
          el.style.position  = "relative";
          el.id             = id;
          //el.className      = "shadowEffect1";
          return el;
      }
  Ob.TextField = function(  L,T,W,H ){ 

    var div =  document.createElement("input"); 
    
    if( L === undefined || T === undefined ) 
        UT.setPos( div, "absolute") 
    else 
        UT.setPos( div, "relative") 
        
    if( L !== undefined ) UT.setL( div, L+""); 
    if( T !== undefined ) UT.setT( div, T+""); 
    if( W !== undefined ) UT.setW( div, W+""); 
    if( H !== undefined ) UT.setH( div, H+"");
    
    
    return div;
  }
  Ob.TextArea1 = function(  L,T,W,H, text ){ 
    var div =  document.createElement("textarea"); 
    UT.setPos( div, "absolute"); 
    UT.setL( div, L+""); 
    UT.setT( div, T+""); 
    UT.setW( div, W+""); 
    UT.setH( div, H+"");
    UT.setBG( div,"transparent" );
    UT.setBor( div,"none" );
    UT.setNoEdit( div );
    UT.setText( div, text );
    
    var ob = {};
        ob.el = div;
    
    return ob;;
  }
  Ob.addDivBlock = function( el,W,H, text ){ 
    if(text === undefined ) text = "";
    var par = (el.el || el);
    var div =  document.createElement("div"); 
    UT.setPos( div, "relative"); 
    UT.setW( div, W+""); 
    UT.setH( div, H+"");
    UT.setDsp( div, "block");
    UT.setBG( div,"transparent" );
    UT.setBorB( div,"1px solid black" );
    UT.setNoEdit( div );
    UT.setText( div, text );
    par.appendChild( div );
    return div;
  }
  Ob.HTMLToDiv = function ( string, id ){
      var A = document.createElement("div");
      A.innerHTML = string;
      A.style.display = "none";
      document.body.appendChild( A ); 
      var B = document.getElementById( id );
      B.parentNode.removeChild( B ); 
      A.parentNode.removeChild( A ); 
      return B;
  }
  Ob.uploadForm = function( id ){
    
      var dummy = document.createElement("div");
      dummy.innerHTML = ''
          + '<form id="form_'+(id)+'" action="upload" method="post" enctype="multipart/form-data" onsubmit="uploadFiles( this, event );">'
          //+ '<input hidden id="INFO_FILE'+("")+'" type="text" name="description" value="'+( id )+'"/>'
          //+ '<input type="file" name="file" multiple="true" />'
          //+ '<br>'
          //+ '<input id="submit_'+(id)+'" type="submit" />'
          + '</form>';
      dummy.style.display = "none";
      document.body.appendChild( dummy ); 
                           
      var formx = document.getElementById( "form_"+(id) );
      
      
      formx.parentNode.removeChild( formx );
      
      dummy.parentNode.removeChild( dummy );
    
      return formx;
  }
  Ob.EX = {};
  Ob.EX.addEventEx             = function(){ console.log('addEvent(window, "onresize", fcn );');};
  Ob.EX.addViewportListenerEx  = function(){ console.log( 'UT.addViewportListener( "eighthundred", 800,  function(){ console.log("its 800");}  );'); };
  return Ob;
}


function newOb( name ){
   var Ob = {};
        Ob.VERSION = 1.1;
        Ob.NAMESPACE_COUNT = 0;
        Ob.NAME = name;
        Ob.CHANGES_VERSION = ["1.1"];
        Ob.CHANGES_NOTES = ["added Ob.ch and Ob.getCh()"];
        Ob.Ut = {};
        Ob.Ut.nextN = function(){ return Ob.NAMESPACE_COUNT++;};
        Ob.ch = [];
        Ob.getCh = function(){ return Ob.ch;};
        Ob.id = Ob.NAME + "_" + Ob.Ut.nextN();
        Ob.CNST = {};
        Ob.pr = undefined;
    return Ob;
}


function newEl( w , h, type ){
      if( type === undefined ) type = "div";
      var El = document.createElement( type );
      El.style.position = "relative";
      El.style.width = w;
      El.style.height = h;
      return El;
  }
  
  
function newOb( name ){
   var Ob = {};
        Ob.VERSION = 1.1;
        Ob.NAMESPACE_COUNT = 0;
        Ob.NAME = name;
        Ob.CHANGES_VERSION = ["1.1"];
        Ob.CHANGES_NOTES = ["added Ob.ch and Ob.getCh()"];
        Ob.Ut = {};
        Ob.Ut.nextN = function(){ return Ob.NAMESPACE_COUNT++;};
        Ob.ch = [];
        Ob.getCh = function(){ return Ob.ch;};
        Ob.id = Ob.NAME + "_" + Ob.Ut.nextN();
        Ob.CNST = {};
        Ob.pr = undefined;
    return Ob;
}


function newEl( w , h, type ){
      if( type === undefined ) type = "div";
      var El = document.createElement( type );
      El.style.position = "relative";
      El.style.width = w;
      El.style.height = h;
      return El;
  }
  
function SVGS(){
  var Ob = {};
      Ob.openSVG = function( svgid ,vw1, vh1 ){
          return '<svg id="'+(svgid)+'" width="'+(vw1)+'" height="'+(vh1)
                + '" style="stroke-width: 0px; background-color: transparent;"'
                + 'version="1.1" xmlns="http://www.w3.org/2000/svg"> ';
      }
      Ob.openGradient = function( name , x1, y1, x2, y2 ){
        return  '<linearGradient id="'+(name)+'" x1="'+(x1)+'" x2="'
                  +(x2)+'" y1="'+(y1)+'" y2="'+(y2)+'"> ';
      }
      Ob.closeSVG = function(){ return '</svg>'; }
      Ob.closeGradient = function( name , x1, y1, x2, y2 ){ return  '</linearGradient>';}
      Ob.openDefinition = function(){ return  '<defs> ';}
      Ob.closeDefinition = function(){ return  '</defs> ';}  
      Ob.addOffsetClass = function( offset , classname ){ return '<stop class="'+(classname)+'" offset="'+(offset)+'"/>';}
      Ob.addOffsetStyle = function( offset , style ){ return '<stop offset="'+(offset)+'" '+(style)+'/> ';}
      Ob.openStyle = function( offset , style ){ return '<style type="text/css"> ' + '<![CDATA[  ';}
      Ob.closeStyle = function( offset , style ){ return ']]></style>'; }
      Ob.addStyle = function(  name , css ){ return "."+name+"{"+css+"}";}
      Ob.openFunctions = function(){ return '<script type="text/ecmascript"><![CDATA[ '; }
      Ob.addFunction = function( functionAsString ){ return functionAsString;}
      Ob.closeFunctions = function(){ return ' ]]></script>';}   
      Ob.templates = {};
      Ob.templates.White = function( index ){
          if(index===undefined) index = 0;
          var id = "Gradient"+index;
          return ""
            + Ob.openGradient( id, 0, 0, 0, 0) 
                + Ob.addOffsetStyle( "0%",   'stop-color="transparent"') 
                + Ob.addOffsetStyle( "100%",  'stop-color="transparent" stop-opacity=".8"')
            + Ob.closeGradient();
      }
      Ob.templates.GradBlueLight0 = function( index ){
          if(index===undefined) index = 0;
          var id = "Gradient"+index;
          return ""
            + Ob.openGradient( id, 0, 0, 0, 1) 
                + Ob.addOffsetStyle( "0%",   'stop-color="#c471f5"') 
                + Ob.addOffsetStyle( "100%",  'stop-color="#fa71cd" stop-opacity=".8"')
            + Ob.closeGradient();
      }
      Ob.templates.GradBlueLight1 = function( index ){
          if(index===undefined) index = 0;
          var id = "Gradient"+index;
          return ""
            + Ob.openGradient( id, 0, 0, 0, 1) 
                + Ob.addOffsetStyle( "0%",   'stop-color="#4facfe"') 
                + Ob.addOffsetStyle( "100%",  'stop-color=" #00f2fe" stop-opacity=".8"')
            + Ob.closeGradient();
      }
      Ob.templates.GradBlueLight2 = function( index ){
          if(index===undefined) index = 0;
          var id = "Gradient"+index;
          return ""
            + Ob.openGradient( id, 0, 0, 0, 1) 
                + Ob.addOffsetStyle( "0%",   'stop-color="#667eea"') 
                + Ob.addOffsetStyle( "100%",  'stop-color="#764ba2" stop-opacity=".8"')
            + Ob.closeGradient();
      }
      Ob.templates.GradBlueLight3 = function( index ){
          if(index===undefined) index = 0;
          var id = "Gradient"+index;
          return ""
            + Ob.openGradient( id, 0, 0, 0, 1) 
                + Ob.addOffsetStyle( "0%",   'stop-color="#43e97b"') 
                + Ob.addOffsetStyle( "100%",  'stop-color=" #38f9d7" stop-opacity=".8"')
            + Ob.closeGradient();
      }
      Ob.templates.GradBlueLight4 = function( index ){
          if(index===undefined) index = 0;
          var id = "Gradient"+index;
          return ""
            + Ob.openGradient( id, 0, 0, 0, 1) 
                + Ob.addOffsetStyle( "0%",   'stop-color="#f78ca0"') 
                + Ob.addOffsetStyle( "19%",   'stop-color="#f9748f"') 
                + Ob.addOffsetStyle( "60%",   'stop-color="#fd868c"') 
                + Ob.addOffsetStyle( "100%", 'stop-color="#fe9a8b" stop-opacity=".8"')
            + Ob.closeGradient();
      }
      Ob.RectGradient = function( w, h, x, y, gradient, rx, ry, id, stroke ){ 
          if(x === undefined ) x = 0;
          if(y === undefined ) y = 0;
          if(rx === undefined ) rx = 0;//50;
          if(ry === undefined ) ry = 0;//5;
          if(gradient === undefined ) gradient = "";
          if( stroke === undefined ) stroke = 'stroke-linecap="round" stroke="lightgrey"  stroke-width="1.5"';
          if( id === undefined ) id = "rect_"+UT.count();
          return ''
              +'<rect '
              +'id="'+(id)+'" '
              +'x="'+(x)+'"  '
              +'y="'+(y)+'"  '
              +'rx="'+(rx)+'"  '
              +'ry="'+(ry)+'"  '
              +'width="'+(w)+'"  '
              +'height="'+(h)+'"  '
              +'fill="url(#'+( gradient )+')" '
              + stroke
              +'/>'
      ;}
      Ob.Rect = function( w, h, x, y, rx, ry, color, id  ){ 
          if(x === undefined ) x = 0;
          if(y === undefined ) y = 0;
          if(rx === undefined ) rx = 0;//50;
          if(ry === undefined ) ry = 0;//5;
          return ''
              +'<rect '
              +'id="'+id+'" '
              +'x="'+(x)+'"  '
              +'y="'+(y)+'"  '
              +'rx="'+(rx)+'"  '
              +'ry="'+(ry)+'"  '
              +'width="'+(w)+'"  '
              +'height="'+(h)+'"  '
              +'fill="'+( color )+'" '
             // +'stroke-linecap="round" stroke="lightgrey"  stroke-width="1.5"'
              +'/>'
      ;}
      Ob.Line = function( x1, y1, x2, y2, style, id, opacity ){ 
            if( style === undefined ) style = 'stroke:'+(GREY_1)+'; stroke-width:1;';
            if( opacity === undefined ) opacity = 1.0;
            if( id === undefined ) id = "Line_"+UT.count();
            return '<line id="'+(id)+'" x1="'+(x1)+'" y1="'+(y1)+'" x2="'+(x2)+'" y2="'
            +(y2)+'"  stroke-opacity="'+(opacity)+'" style="'+( style )+'" />';
      ;}
      Ob.PolyLineParse = function( xy, from, to ){
        // x values : even 
        // y values : odds
        if(from === undefined ) from = 0;
        if(to   === undefined ) to = xy.length;
        var build = "";
        for( var i = 0 ; i < xy.length; i+=2 ){// xy.length; i+=2 ){
              x = xy[i+0];
              y = xy[i+1];
              if(i !== 0) build += " ";
              build += x + "," + y;
          }
        return build;
      }
      Ob.Polyline = function( xy, style, id, opacity ){
          if( style === undefined ) style = 'stroke:'+(GREY_1)+'; stroke-width:3;';
          if( opacity === undefined ) opacity = 1.0;
          if( id === undefined ) id = "Polyline_"+UT.count();
          var x, y;
          var build  = '<polyline id="'+(id)+'" points="';
              build += Ob.PolyLineParse( xy ); 
              build += '" stroke-opacity="'+(opacity)+'" style="'+( style )+'" />';
          return build;
      }
      return Ob;
}  



function BlanketScreenWidget(){
    var Ob = newOb("BlanketScreenWidget");
    Ob.mask = undefined;
    Ob.CNST.HEADER_HEIGHT = 0;
    Ob.init = function(){
        var el = document.createElement("div");
        el.style.position = "absolute";
        el.style.width = "100%";
        el.style.height = "1000" + "px";
        el.style.top = this.CNST.HEADER_HEIGHT+"px";
        el.style.left = 0;
        //el.style.backgroundColor = "#e3e3e3";
        el.style.display= "";
        document.body.appendChild( el );
        Ob.el = el;
        return this;
    };
    Ob.ch = [];
    Ob.getCh = function(){ return Ob.ch; };
    Ob.getDc = function(){
        var build = [], L = Ob.getCh().length;
        for( var i = 0; i < L; i++ ){
            L2 = Ob.getCh()[i].getCh().length;
            for( var j = 0; j < L2; j++ ){
                build.push( Ob.getCh()[i].getCh()[j] );
            }  
        }
        return build;
    };
    Ob.zombify = function( fcn, i, list  ){ 
        ////alert("3. "+list);
        var ch = Ob.getDc(), L = ch.length;
        var ALL = i === undefined, ONE = !ALL;
        if( ALL ){ for( var i = 0; i < L; i++ ){ fcn( ch[i], MASKS, list );} } else
        if( ONE ){ fcn( ch[i], MASKS, list ); }
    };
    Ob.add = function( child ){ Ob.ch.push( child ); };
    Ob.on = function(){Ob.el.style.display = ""; return this;};
    Ob.off = function(){ Ob.el.style.display = "none"; return this;};
    Ob.init();
    Ob.off();
    return Ob;
}

var App = WebApp( "ROOT", "dotcom", secure = true ); 
var COLGREY_0 = "#EFEFEF";
var GREY_1 = "#F5F5F5";
var GREY_2 = "#DDDDDD";
var GREY_3 = "#ADADAD";
var SVG               = SVGS();
var VIEWS             = ViewManager();
var HIGHLIGHT_COLOR   = GREY_1;//"rgba(0,249,199,.2)";
var B_1               = 2;
var ER                = 2;
var UN                = undefined;
var LINEW             = 3;
var DATA_ADDED        = false;
var GRADIENT_INDICES  = 1111;

loadingScreenInit();
var CURRENT_IMGS   = []; 
var EXTENTION_1_INPUT = false;

var TIME_TEST = 0;

// var PLCHORDS          = PLCoordinates();
 
// if(index === 1 && prev < index ) return introToPointsPLCFast();
function resetVis(){
  
  ParallelVis.aaa.setNumber( "" );
  ParallelVis.aaa.count = 0;
  
  ParallelVis.aaa2.setNumber( "" );
  ParallelVis.aaa2.count = 1;
 
  clear();
     var setLineControlDisplay = function( val ){
            UT.setDsp(  ParallelVis.aaa2.left      , val );
            UT.setDsp( ParallelVis.aaa2.mid       , val );
            UT.setDsp( ParallelVis.aaa2.right     , val );
            UT.setDsp( ParallelVis.aaa2.collapseV  , val );
            UT.setDsp( ParallelVis.aaa2.collapseH  , val );
        }
        
        
  setLineControlDisplay("none"); 
  
  UT.setBGSVGnot64( ParallelVis.aaa.right , RightArrow( "black" ), "100%" ); 
  //for( var i = 0; i < CURRENT_IMGS.length; i++ ){
      //console.log(document.getElementById(CURRENT_IMGS[i]).id);
      //style.display = "none";
  //}
  //CURRENT_IMGS = [];
  
  
}
function clear(){
  for( var i = 0; i < CURRENT_IMGS.length; i++ ){
      CURRENT_IMGS[i].style.display = "none";
  }
  CURRENT_IMGS = [];
}

var DATA = [], TARGETS = [];
var BAD_ROWS = [];
var BUCKET = [];

function getData(){
  return DATA;
}
function getTargets(){
  return TARGETS;
}
function getSVGStringPLC( PLCords ){
    var build = "";
    for( var i = 0 ; i < PLCords.length; i++ ){
        build += SVG.Rect( PLCords[i].w, PLCords[i].h, PLCords[i].x1, PLCords[i].y1, 0, 0, "black", "dimensionLine"+UT.count()  );
    }
    return build;
}
function getSVGStringCLC( CPCords ){
    var build = "";
    for( var i = 0 ; i < CPCords.length; i++ ){
        build += SVG.Rect( CPCords[i].w, CPCords[i].h, CPCords[i].x1, CPCords[i].y1, 0, 0, "black", "dimensionLine"+UT.count() );
    }
    return build;
}
function getSVGStringCLCObject( CPCords ){
    var build = "";
    var info = [], id;
    for( var i = 0 ; i < CPCords.length; i++ ){
        id = "dimensionLine"+UT.count();
        info.push( {x: CPCords[i].x1, y: CPCords[i].y1, id: id }); 
        build += SVG.Rect( CPCords[i].w, CPCords[i].h, CPCords[i].x1, CPCords[i].y1, 0, 0, "black", id );
    }
    return [build, info ];
}

 
 
 
    function PLCoordinates(){
        var M = 50;
        var X = 10;
        var W = 100;
        var H = 200;
        var Y = 50;
        var Z = 5;
        var S = 0;
        var x = M;
        var y = Y;
        var w = W;
        var h = H;
        var z = Z;
        var m = M;
        var cords = [];
        var X1 = x;
        for( var i = 0 ; i < getData().length; i++ ){
            var chord = { x1: (X1), y1: y, x2: (X1 + z), y2: (y + h), w: z, h:h }; 
            cords.push( chord );
            X1 += w + m;
        }
        return cords;
    }
    
     function CPCoordinates(){
         var M = 50;
        var X = 10;
        var W = 100;
        var Er = 2;
        var H = 200;
        var Y = 50;
        var Y1 = 50;
        var Z = 5;
        var S = 0;
        var cords = [];
        var Xs = [];
        X1 = M;
        for( var i = 0 ; i < getData().length; i++ ){
            Xs.push( X1 );
            if( i % 2 === 0 ) continue;
            X1 += W + M;
        }
        for( var i = 0, j = 0; i < Xs.length; i++ ){
            X1 = 0;
            if((i % 2 === 0) && i !== 0) j++;
            if( i % 2 === 0 ){ 
              W1 = H;
              H1 = Z;
              Y1B = Y1 + H - Er;
              X1 = j * ( W + M );
            } else {
              W1 = Z;
              H1 = H;
              Y1B = Y1;
              X1 = j * ( W + M );
            }
            var chord = { x1: (Xs[i] + X1), y1: Y1B, x2: (Xs[i] + X1 + W1), y2: (Y1B + H1), w: W1, h:H1 }; 
            cords.push( chord );
        }
      
         return cords;
    }
    
function normalize( vals_sorted ){
                       
                
              // normalize data
              var min, max, dif, v;
              var test_from, test_to;
              for( var i = 0; i < vals_sorted.length; i++ ){
                  min = Number.MAX_SAFE_INTEGER;
                  max = Number.MIN_SAFE_INTEGER;
                  for( var j = 0 ; j < vals_sorted[i].length; j++ ){
                      v = vals_sorted[i][j] * 1;
                      if( v < min ) min =  v;
                      if( v > max ) max =  v;
                  }
                  dif = max - min;
                  for( var j = 0 ; j < vals_sorted[i].length; j++ ){
                      test_from = vals_sorted[i][j];
                      vals_sorted[i][j] -= min;
                      vals_sorted[i][j] = (vals_sorted[i][j] === 0 ) ? 0 : vals_sorted[i][j] / dif;
                      vals_sorted[i][j] = vals_sorted[i][j].toFixed(3);
                      test_to = vals_sorted[i][j];
                      
                      ////console.log( "MIN: " + min+"\t" + "dif:" + dif + "\t" + test_from + " -> " + test_to );
                  }
              }
              //console.log( vals_sorted );
                return vals_sorted;
                
              }            

function onLoad(){


    
    window[ "E" ]                     = function( id ){  OMAP.getE(id); }
    window[ "O" ]                     = function( id ){  OMAP.getO(id); }
    window.scrollTo(0, 0);
    
    // Add screen
    screenInit();
    
    // Initialize Webapp
    webappInit();
    /*

    */
    
     
}



function Visualization( obj, name, color  ){
    
    var BasicToolbar = Toolbar( obj, name );
    
    var BasicViewer = Viewer( obj, name );
    
    var BasicControl = Control( obj, name );
    
    var BasicDisplay = Display( obj, name );
    
    var Ob = {};
        Ob.id         = name;
        Ob.toolbar    = BasicToolbar;
        Ob.viewer     = BasicViewer;
        Ob.control    = BasicControl;
        Ob.display    = BasicDisplay;
        Ob.hide       = function(){
          Ob.toolbar.hide();
          Ob.viewer.hide();
          Ob.control.hide();
          Ob.display.hide();
          return this;
        }
         Ob.show  = function(){
          Ob.toolbar.show();
          Ob.viewer.show();
          Ob.control.show();
          Ob.display.show();
          return this;
        }
        Ob.addTo      = function( Object ){
          Object.toolbar[ name ]    = Ob.toolbar;
          Object.viewer[ name ]     = Ob.viewer;
          Object.control[ name ]    = Ob.control;
          Object.display[ name ]    = Ob.display;
        }
        Ob.addTo( obj ); 
    if( color !== undefined ){
        UT.setBG(BasicToolbar.el,  color ); 
        UT.setBG(BasicViewer.el, color);
        UT.setBG(BasicControl.el, color );
        UT.setBG(BasicDisplay.el, color );
    } 
    
    

    
    var isParallel = name.toLowerCase().indexOf("parallel") !== -1 ;
    if( isParallel ){
      
        
        var tb = Ob.toolbar.el;
        UT.setBG( tb, "white" ); 
        
        // create the buttons
        var BUTTONS = [
            UT.quickBtn(), 
            UT.quickBtn(), UT.quickBtn(), UT.quickBtn(),
            UT.quickBtn(), UT.quickBtn(), UT.quickBtn(),
            UT.quickBtn(),UT.quickBtn(),
        ];
        
        for(var i = 0 ; i < BUTTONS.length; i++ ){ tb.appendChild(BUTTONS[i]); }
        BUTTONS[0].style.display = "none";
        var left1   = BUTTONS[1], mid1 = BUTTONS[2], right1 = BUTTONS[3];
        var tv1     = Traversal( obj, left1, mid1, right1, 5, blockOnClick = true ); 
        var left2   = BUTTONS[4], mid2 = BUTTONS[5], right2 = BUTTONS[6];
        var tv2     = Traversal( obj, left2, mid2, right2, 5); 
        
        
        
        
        Ob.aaa = tv1;
        Ob.aaa2 = tv2;
        
        
        
        var collapseV = BUTTONS[7];
        var collapseH = BUTTONS[8];
        
        tv2.collapseV = collapseV;
        tv2.collapseH = collapseH;
        
        UT.setBGSVGnot64( collapseV , CollapseV(), "100%" ); 
        collapseV.style.backgroundColor = "transparent";
        UT.setBGSVGnot64( collapseH , CollapseH(), "100%" ); 
        collapseH.style.backgroundColor = "transparent";
            
            
            window["pcl"] = ParallelColocatedLine( Ob.display.el );
            
        var setLineControlDisplay = function( val ){
            UT.setDsp( left2      , val );
            UT.setDsp( mid2       , val );
            UT.setDsp( right2     , val );
            UT.setDsp( collapseV  , val );
            UT.setDsp( collapseH  , val );
        }
    
      setLineControlDisplay("none"); 
        
        
        
        function redefineTV1Left(){
            BUTTONS[1].style.display = "none";
            BUTTONS[0].style.display = "inline-block";
            UT.setBGSVGnot64( BUTTONS[0] , RESET( "black" ), "80%" ); 
            UT.setBG( BUTTONS[0] ,"transparent" ); 
            BUTTONS[0].onclick = function(){
                resetVis();
            }
          
        }
        redefineTV1Left();
        
        
        
      
        var introToPointsPLCFast = function(){
            //getDataSingleton();
            
            var postDelay = 100;
            var duration = 1000;
            var timeline = undefined;
            pcl.toIntroFcnFast()();
            pcl.toPointsPLCFast();
            
            //   var data = DATA;
            //var targets = TARGETS;
        }
        
        var pointsToLinesPLCFast = function(){
         
         
            
            var data      = getData();
            var trgt      = getTargets();
            
            
            clear();
            
            

            pcl.toLinesPLCFast( data , trgt );

        }

        var transPLCToCPCFast = function(){
          
            //getDataSingleton();
            var data      = getData();
            var trgt      = getTargets();
            //var data      = obj.data.unsorted.data;
            //var trgt      = obj.data.unsorted.targets; 
            //var id1       = pcl.ids.lines[0].substring( 1, pcl.ids.lines[0].length );
            //var id2       = pcl.ids.points[0].substring( 1, pcl.ids.points[0].length );
            //var par1      = document.getElementById( id1 ).parentNode;
            //var par2      = document.getElementById( id2 ).parentNode; 
            //par1.style.display = "none";
            //par2.style.display = "none";
            
            clear();
            //var timeline = pcl.fadeOut( names );
            var slower = pcl.toCPCFcnFast();
            UT.callback([ slower ],[100]);
            pcl.toPointsCLCAFast( data , trgt );
            
            ////alert( names ); 
        }
        
        var pointsCLCFromAtoBFast = function(){
          
            //getDataSingleton();
            //var data      = getData();
            //var trgt      = obj.data.unsorted.targets; 
            var data      = getData();
            var trgt      = getTargets();
            
            clear();
            pcl.toPointsCLCBFast( data , trgt  );
  
        }
        
        var pointsToLinesCLCFast = function(){
            //getDataSingleton();
            //var data      = obj.data.unsorted.data;
            //var trgt      = obj.data.unsorted.targets; 
            var data      = getData();
            var trgt      = getTargets();
            //var id2       = pcl.ids.points[0].substring( 1, pcl.ids.points[0].length );
            //var par2      = document.getElementById( id2 ).parentNode; 
            clear();
            //par2.style.display = "none";
            pcl.toLinesCLCBFast( trgt  );
            setLineControlDisplay("inline-block"); 
        }
        
        
        
        
     
        
        
        

        tv1.act= function(){
              var index   = this.count;
              var prev    = this.prev;
              ////console.log( "prev: "+prev+"\tthis: "+index);
               //if(index === 1 && prev < index ) return introToPointsPLCFast();
               //if(index === 2 && prev < index ) return introToPointsPLCFast();
               //if(index === 3 && prev < index ) return introToPointsPLCFast();
               //if(index === 4 && prev < index ) return introToPointsPLCFast();
               //if(index === 5 && prev < index ) return introToPointsPLCFast();
               
               if(index === 1 && prev < index ) return introToPointsPLCFast();
               if(index === 2 && prev < index ) return pointsToLinesPLCFast();
               if(index === 3 && prev < index ) return transPLCToCPCFast();
               if(index === 4 && prev < index ) return pointsCLCFromAtoBFast();
               if(index === 5 && prev < index ) return pointsToLinesCLCFast();
         }
         

         tv2.act= function( obj ){
           
           
           
            
            
            colorids = pcl.ids.gradients;
                    
            this.setMax( pcl.ids.lines ); 
            
            
            var index         = this.count;
            var prev          = this.prev;
            var zero_indexed  = index - 1;
           
           
           
            
            
            function grad( index ){
                  if( index >= colorids.length ) return colorids[0];
                  else return colorids[index];
            }
                      
                      
                      
           
            // return previous line to unactive style, if within bounds
            var traversal = ( prev < index );
            var reversal  = ( prev > index );
            var prev;
            if( traversal ) prev    = zero_indexed - 1;
            else 
            if( reversal )  prev    = zero_indexed + 1;
            if(  prev >= 0 && prev < pcl.ids.lines.length ){
                var prevC   = grad( pcl.ids.lines[ prev ].c);
                var prevsvg = document.getElementById( pcl.ids.lines[ prev ].id );
                prevsvg.setAttribute('style',  'stroke:url(#Gradient'+( prevC )+'); stroke-width:'+( LINEW )+';fill: transparent;' );
            }


            // set current line to the 'active' style, bring to front
            var style = 'stroke:black; stroke-width:10; fill: transparent;';
            var svg   = document.getElementById( pcl.ids.lines[ zero_indexed ].id );
            var par = svg.parentNode;
           ////console.log( "line: " +JSON.stringify(pcl.ids.lines[ zero_indexed ]) );
            svg.setAttribute('style',  style );
            par.removeChild( svg ); 
            par.appendChild( svg ); 
            

         }
         
         
         // align Y
         BUTTONS[7].onclick = function(){
            if( tv2.count < 1 ){ alert("Please select line > 0."); return;}
            
            var index           = tv2.count; 
            var zero_indexed    = index - 1;
            var points          = pcl.ids.lines[ zero_indexed ].points;
            var svg             = document.getElementById( pcl.ids.lines[ zero_indexed ].id );
            var y1               = points[1];
 
            var pointsY;
            var len             = pcl.ids.lines.length;
            
         
            
            // move all points other than original points
            for( var i = 0 ; i < len; i++ ){
                if(i == zero_indexed) continue;
                pointsY = pcl.ids.lines[ i ].points;
                for(var j = 3 ; j < pointsY.length; j+=2 ){
                  y2 = pcl.ids.lines[ zero_indexed ].points[j];
                  dy = y1 - y2;
                  pointsY[j] += dy;
                 ////console.log(  "y1 += "+(y1)+" - "+(y2)+" == "+ dy);   
                }
                pointsY[  pointsY.length-1 ]++;
                points_str = SVG.PolyLineParse( pointsY ); 
                svg = document.getElementById( pcl.ids.lines[ i ].id );
                svg.setAttribute('points',  points_str );
                ////console.log(  JSON.stringify(document.getElementById( pcl.ids.lines[ i ].id ).points ));   
            }
            
            
            var dys = [ 0, 0 ];
            
            // move original line, not done initially because calculations are based off this one
            pointsY = pcl.ids.lines[ zero_indexed ].points;
            for(var j = 3 ; j < pointsY.length; j+=2 ){
                  dys.push( y1 - pointsY[j] ); 
                  dys.push( y1 - pointsY[j] ); 
                  pointsY[j] = y1;
                  
            }
            pointsY[  pointsY.length-1 ]++;
            points_str = SVG.PolyLineParse( pointsY ); 
            svg = document.getElementById( pcl.ids.lines[ zero_indexed ].id );
            svg.setAttribute('points',  points_str );
            
            
            
            
            
            
            //var BG1 = pcl.getBG( 1 );
           ////console.log( "dys: " + dys );
            
            
            var BG1 = pcl.ids.grids
            var subsvg, adjusted;
            for( var i = 0, j = 0, k ; i < BG1.length; i++ ){
                if( j++ < 2 ) continue;
                k  = j - 1;
                subsvg = document.getElementById(BG1[i].id);
                adjusted = subsvg.y.baseVal.value + dys[k];
                subsvg.setAttribute('y',  adjusted );
            }

         }
         
         
         
         // align X
         BUTTONS[8].onclick = function(){

            if( tv2.count < 1 ){ alert("Please select line > 0."); return;}

            var index           = tv2.count;
            var zero_indexed    = index - 1;
            var points          = pcl.ids.lines[ zero_indexed ].points;
            var svg             = document.getElementById( pcl.ids.lines[ zero_indexed ].id );
            var x1               = points[0];
 
            var pointsX;
            var len             = pcl.ids.lines.length;
            
            
            if( index < 1 ){ alert("Please select line > 0."); return;}
            
            for( var i = 0 ; i < len; i++ ){
                if(i == zero_indexed) continue;
                pointsX = pcl.ids.lines[ i ].points;
                for(var j = 2 ; j < pointsX.length; j+=2 ){
                  x2 = pcl.ids.lines[ zero_indexed ].points[j];
                  dx = x1 - x2;
                  pointsX[j] += dx;
                 ////console.log(  "x1 += "+(x1)+" - "+(x2)+" == "+ dx);   
                }
                points_str = SVG.PolyLineParse( pointsX ); 
                svg = document.getElementById( pcl.ids.lines[ i ].id );
                svg.setAttribute('points',  points_str );
                ////console.log(  JSON.stringify(document.getElementById( pcl.ids.lines[ i ].id ).points ));   
            }
            
            
            var dxs = [ 0, 0 ];
            pointsX = pcl.ids.lines[ zero_indexed ].points;
            for(var j = 2 ; j < pointsX.length; j+=2 ){
                  dxs.push( x1 - pointsX[j] ); 
                  dxs.push( x1 - pointsX[j] ); 
                  pointsX[j] = x1;
            }
            points_str = SVG.PolyLineParse( pointsX ); 
            svg = document.getElementById( pcl.ids.lines[ zero_indexed ].id );
            svg.setAttribute('points',  points_str );
            var BG1 = pcl.ids.grids
            var subsvg, adjusted;
            for( var i = 0, j = 0, k ; i < BG1.length; i++ ){
                if( j++ < 2 ) continue;
                k  = j - 1;
                subsvg = document.getElementById(BG1[i].id);
                adjusted = subsvg.x.baseVal.value + dxs[k];
                subsvg.setAttribute('x',  adjusted );
            }
         }
         
         
         
         
         
         
         
         
         
         function Traversal( webapp, left , mid, right, max, block ){
            
            //left.style.display = "none";
            
            
            var Traversal     = {};
            Traversal.webapp  = webapp;
            Traversal.left    = left;
            Traversal.mid     = mid;
            Traversal.right   = right;
            Traversal.cover   = UT.newAbs("150px", "50px");
            Traversal.prev    = 0;
            Traversal.count   = 0;
            Traversal.min     = 1;
            Traversal.max     = max;
            
            UT.setBGSVGnot64( Traversal.left , LeftArrow( "grey" ), "100%" ); 
            Traversal.left.style.backgroundColor = "transparent";
            
            
            Traversal.mid.style.backgroundColor = GREY_2;
            Traversal.mid.style.borderRadius = "100%";
            Traversal.mid.style.marginBottom = "20px";
            Traversal.mid.style.verticalAlign = "top";
            
            var p =  document.createElement("p");
            p.style.textAlign = "center";
            mid.appendChild( p );
            Traversal.setNumber = function( txt ){ p.innerHTML = txt; };
            Traversal.setMax = function(max){ Traversal.max = max; }
            
            
            UT.setBG(  Traversal.cover, "white");
            UT.setDsp( Traversal.cover, "none");
            UT.setO( Traversal.cover, ".6");
            right.parentNode.appendChild( Traversal.cover ); 
            
            
            Traversal.countUp   = function(){ Traversal.prev = Traversal.count; Traversal.count++; }
            Traversal.countDown = function(){ Traversal.prev = Traversal.count; Traversal.count--; }
            Traversal.setColor = function(){
                if( Traversal.count === Traversal.min  )
                    UT.setBGSVGnot64( Traversal.left , LeftArrow( "grey" ), "100%" ); 
                else 
                    UT.setBGSVGnot64( Traversal.left , LeftArrow( "black" ), "100%" ); 
                
                if( Traversal.count === Traversal.max  )
                    UT.setBGSVGnot64( Traversal.right , RightArrow( "grey" ), "100%" ); 
                else 
                    UT.setBGSVGnot64( Traversal.right , RightArrow( "black" ), "100%" ); 
            };
            
    
            
            //Traversal.setNumber( Traversal.count );
            UT.setBGSVGnot64( Traversal.right , RightArrow( "black" ), "100%" ); 
            Traversal.right.style.backgroundColor = "transparent";
            
            Traversal.left.onclick = function(){
                //if( block === true ) UT.setDsp( Traversal.cover, ""); 
                if( Traversal.count === Traversal.min ) return;
                else Traversal.countDown();
                Traversal.setColor();
                Traversal.setNumber( Traversal.count ); 
                Traversal.act( webapp ); 
            }
            
            Traversal.right.onclick = function(){
                //if( block === true ) UT.setDsp( Traversal.cover, ""); 
                if( Traversal.count === Traversal.max ) return;
                else Traversal.countUp();
                Traversal.setColor();
                Traversal.setNumber( Traversal.count ); 
                Traversal.act( webapp ); 
            }
            
    
         

           return Traversal;
           
         }
         
       
    }
    
    
    
    
    
    
    
    
    
    
    return Ob;
}          

       
 
 function getInfoAndUsername( WebApp ){
    SERVER.loadCmdAction("datasetsU", function( rawdata ){ // function( assignments ){ 
    
    
        var username        = rawdata.pop().username;  
        var datasets        = rawdata.pop().data;
        WebApp.username     = username;
        WebApp.info         = datasets;
    });
 }

function isDataAdded(){
  var found_empty_cells = false;
  var v;
  //if( !EXTENTION_1_INPUT ) return true;
  if( EXTENTION_1_INPUT ) return true;
  for( var i = 0; i < TABLE.r; i++ ){
      for( var j = 0; j < TABLE.c; j++ ){
          v  = TABLE.getV(i, j).trim();
          if( v.length === 0 ){ 
              alert("Found one or more empty cells."); 
              return false; 
          } 
          if( isNaN(v) ){ 
              alert("Found one or more non-numeric characters."); 
              return false; 
          } 
      }
  }
  return true;
}       


function resetTable(){
          
            var reset = function(){
              EXTENTION_1_INPUT = false;
              resetVis();
                   for( var i = 0 ; i < DATA.length; i++ ){
              for( var j = 0 ; j < DATA[i].length; j++ ){
                  TABLE.setV(j, i, "");
              }
          }
          DATA = [];
          TARGETS = [];
          //DATA_ADDED = isDataAdded();
                TABLE.setRowN(4);
                TABLE.setColN(4);
                loadingScreenOff();
            }
            loadingScreenOn();
            UT.callback([ reset ],[100]);
            
            
            

  
}          
function VisApeWebApp( screen ){
                
    // dummy divs to hold place of 'fixed' headers
    var placeholders = addHeaderPlaceHolders();
    var placeholder1 = placeholders[0];
    var placeholder2 = placeholders[1];

    // add the main area(s)
    var sections = addSections();
    window["collapsed"] = sections[0];
    var main     = sections[1];

    
    
    
    // add headers and footers
    var headersFooters= addHeaders2XFooters2X(); 
    var header        = headersFooters[0];
    var toolbar       = headersFooters[1];
    var footerB       = headersFooters[2];
    var footerT       = headersFooters[3];
    mainHeaderStyle( header ); 
    
    // add the control-section (on left) and the view-section (right)
    var controls_view = addBasicDisplay( main ); 
    controlspace      = controls_view[0];
    viewerspace       = controls_view[1];

    var setAppSize    = function( size ){ UT.setH( main, size);}
    var showCollapsed = function(){ UT.setDsp(collapsed,""); }
    var hideCollapsed = function(){ UT.setDsp(collapsed,"none"); }
    var setBodySectionHeight = function( val ){  main.style.height = val; }
    setAppSize("auto"); 
    
    // compile object
    var Ob = {};
        Ob.toolbar      = {};
        Ob.control      = {};
        Ob.viewer       = {};
        Ob.display      = {};
        Ob.data      = {};
        Ob.username;
        Ob.info;
        Ob.collapsed = collapsed;
        //getInfoAndUsername( Ob ); 
        
        Ob.getToolbarEl   = function(){ return toolbar; }
        Ob.getControlEl   = function(){ return controlspace; }
        Ob.getViewerEl    = function(){ return viewerspace; }
        Ob.getDisplayEl   = function(){ return collapsed; }
        
        
    // build sections
    
    window["BasicVis"]      = Visualization( Ob , "Basic"   ,  "white" ).hide();
    BasicVis.viewer.el.style.display = "none";
    BasicVis.control.el.style.display = "none";
    var test = BasicVis.display.el;
    
    
    window["ParallelVis"]   = Visualization( Ob , "Parallel",  "white" ).hide();
  
    window["Info"]          = Visualization( Ob , "Info"   ,  "white" ).hide();
    Info.viewer.el.style.display = "none";
    Info.control.el.style.display = "none";
    var test2 = Info.display.el;
    UT.setBG( test2 , "transparent");  
    //var DcpFpprVis    = Visualization( Ob , "DcpFppr" ,  "white" ).hide();
    
    // here
    function addSection( section, left, title ){
        var s1 = UT.newRel("100%", "150px");
        s1.style.overflow = "hidden";
        section.appendChild( s1 ); 
        UT.setBG(s1,  GREY_1 );
            var t1 = document.createElement("p");
            t1.style.margin = "0";
            t1.style.border = "0";
            t1.style.padding = "0";
            t1.style.fontSize = "30px";
            t1.innerHTML = title;
            t1.style.fontWeight = "600";
            t1.style.display = "block"; //UT.setBor(t1, "1px solid black");
            t1.style.textAlign = "center";
            UT.setBG(t1,  GREY_1 );
        s1.appendChild( t1 ); 
            w = left;
            var s1A = UT.newAbs((w)+"%", "100%");
            s1A.style.display = "inline-block";
            UT.setT( s1A , "40px"); 
            UT.setBG(s1A,  GREY_2 );
            var v1_button = UT.quickBtn(); 
            v1_button.style.borderRadius = "20px";
            v1_button.style.border = "7px solid " + GREY_1;
            UT.setT( v1_button , "calc(50% - 50px)"); 
            UT.setL( v1_button , "calc(50% - 30px)"); 
            UT.setPos( v1_button , "absolute"); 
            UT.setBG( v1_button , "transparent"); 
            v1_button.style.cursor = "";
            s1A.appendChild( v1_button ); 
        s1.appendChild( s1A );
            w2 = 100 - w;
            var s1B = UT.newAbs((w2)+"%", "100%");
            s1B.style.left = w+"%";
            s1B.style.display = "inline-block";
            UT.setBG(s1B,  "silver" );
            UT.setT( s1B , "40px"); 
            var t2 = document.createElement("p");
                t2.style.fontSize = "16px";
                t2.innerHTML = "sdf";
                t2.style.margin = "0";
                t2.style.verticalAlign = "top";
                t2.style.border = "0";
                t2.style.paddingLeft = "15px";
                t2.style.paddingTop = "15px";
                t2.style.display = "block";
                t2.style.height = "100%";
                //t2.style.textAlign = "center"; 
            s1B.appendChild( t2 ); 
        s1.appendChild( s1B );
      return [s1A, s1B, v1_button, t2];
      
    }
    
    function buttonText( btn, text, fontsize, left, top ){
      fontsize = (fontsize === undefined) ? "40px" : fontsize;
      left = (left === undefined) ? "66px" : left;
      top = (top === undefined) ? "-6px" : top;
      var p1 = document.createElement("p");
      btn.parentNode.appendChild( p1 ); 
      p1.style.fontSize = fontsize;
      p1.innerHTML = text;
      p1.style.position = "absolute";
      p1.style.top = top;
      p1.style.left = left;
      p1.style.fontWeight = "600";
      
      
      
      
      
      
    }
    function designInfo(){
        var STEPS = 1;
        var test2 = Info.display.el;
        var sections = UT.newAbs("500px", "1000px");
        UT.setL( sections, "calc( 50% - 300px)");
        test2.appendChild( sections ); 
        UT.setBG(sections, "black");
        

        var v1 = addSection( sections, 30, "Step "+(STEPS++)  );
        UT.setBGSVGnot64( v1[2] , TEXTFILE(), "100%" ); 
        var instr1 = ""
         + "Open a text file containing your data that is comma delimited, tab delimited, or "
         + "space delimited. Copy your data via Ctrl+C on PC, or Cmd+C on Mac.";
        v1[3].innerHTML = instr1;
        
        
        var v2 = addSection( sections, 30,"Step "+(STEPS++)  );
        UT.setBGSVGnot64( v2[2] , TEST1(), "100%" ); 
        var instr2 = ""
         + "Click the button that looks like an Excel table in the bottom left "
         + "corner of the screen. This will open up the table menu."
        v2[3].innerHTML = instr2;
        
        
        var v3 = addSection( sections, 30,"Step "+(STEPS++)  );
        UT.setBG( v3[2], "#76E5FF");
        var instr3 = ""
         + "Before attempting to paste any data into the table, click on any one "
         + "of the table's cells. You should see the table cell you clicked highlight "
         + " to blue. Once this happens, press Ctrl+C on PC, or Cmd+C on Mac, to paste "
         + " data into the table. "
        v3[3].innerHTML = instr3;
        
        
        var v4 = addSection( sections, 30,"Step "+(STEPS++)  );
        UT.setBGSVGnot64( v4[2] , TEST2(), "100%" );
        var instr4 = ""
         + "After the data has populated the table, press the graph button (also in the "
         + "bottom left corner of the screen). "
        v4[3].innerHTML = instr4;
        
        
        var v5 = addSection( sections, 30,"Step "+(STEPS++)  );
        UT.setBGSVGnot64( v5[2] , RightArrow(), "100%" );
        var instr5 = ""
         + "In the top left, see the header toolbar, where the clicking the Right Arrow Button "
         + "cycles through the various steps going from Parallel Line Coordinates "
         + "to Collocated Line Coordinates."
        v5[3].innerHTML = instr5;
        
        
        var v6 = addSection( sections, 30,"Step "+(STEPS++)  );
        buttonText( v6[2] , "1"); 
        var instr6 = ""
         + "On the first click of the Right Arrow Button in the header toolbar, "
         + "the Parallel Line Coordinates will populate, formatted in points."
        v6[3].innerHTML = instr6;
         
        var v7 = addSection( sections, 30,"Step "+(STEPS++)  );
        buttonText( v7[2] , "2"); 
        var instr7 = ""
         + "On the second click of the Right Arrow Button in the header toolbar, the "
         + "Parallel Line Coordinates will repopulate, formatted in lines."
        v7[3].innerHTML = instr7;
        
        
        var v8 = addSection( sections, 30,"Step "+(STEPS++)  );
        buttonText( v8[2] , "3"); 
        var instr8 = ""
         + "On the third click of the Right Arrow Button in the header toolbar, the "
         + "Parallel Line Coordinates will start to change to Collocated Line Coordinates, "
         + "formatted in points, albeit without any dimensionality reduction."
        v8[3].innerHTML = instr8;
        
        
        var v9 = addSection( sections, 30,"Step "+(STEPS++)  );
        buttonText( v9[2] , "4"); 
        var instr9 = ""
         + "On the fourth click of the Right Arrow Button in the header toolbar, the "
         + "Collocated Line Coordinates will perform lossless dimensionality reduction, "
         + "while still being formatted in points."
        v9[3].innerHTML = instr9;
        
        
        var v10 = addSection( sections, 30,"Step "+(STEPS++)  );
        UT.setBGSVGnot64( v10[2] , RightArrow(), "100%" );
        var instr10 = ""
         + "On the fifth click on the Right Arrow Button in the header toolbar, "
         + "Collocated Line Coordinates will repopulate, formatted in lines. "
         + "Furthemore, a second&nbsp; set of Arrow Buttons will appear to the right."
        v10[3].innerHTML = instr10;
        
        
        var v11 = addSection( sections, 30,"Step "+(STEPS++)  );
        buttonText( v11[2] , "2", "13px", "85px", "20px"); 
        UT.setBGSVGnot64( v11[2] , RightArrow(), "100%" );
        var instr11 = ""
         + "Clicking on the newly appearing set of Arrow Buttons in the header toolbar "
         + "will select a given case in the data, shown via the black line. <br>"
         + "(Note: the '2' on the Arrow Button to the left does not appear on the actual button)"
        v11[3].innerHTML = instr11;
        
        
        var v12 = addSection( sections, 30,"Step "+(STEPS++)  );
        UT.setBGSVGnot64( v12[2] , CollapseV(), "100%" );
        var instr12 = ""
         + "Clicking the Double Vertical Inward Pointing Buttons in the header toolbar "
         + "will collapse the y-axis of the selected case."
        v12[3].innerHTML = instr12;
        
        
        var v13 = addSection( sections, 30,"Step "+(STEPS++)  );
        UT.setBGSVGnot64( v13[2] , CollapseH(), "100%" );
        var instr13 = ""
         + "Clicking the Double Horizontal Inward Pointing Buttons in the header toolbar "
         + "will collapse the x-axis of the selected case. "
         + "Used in conjunction with the Vertical Collapse button will result in the selected case "
         + "collapsing to a single point."
        v13[3].innerHTML = instr13;
        
        STEPS = 1;
        var v14 = addSection( sections, 30,"Control "+(STEPS++)  );
        UT.setBGSVGnot64( v14[2] , RESET(), "90%" );
        var instr14 = ""
         + "Located in the top left corner of the screen, this will reset the visualization step to 1."
        v14[3].innerHTML = instr14;
        
        
        var v14 = addSection( sections, 30,"Control "+(STEPS++)  );
        UT.setBGSVGnot64( v14[2] , ZoomIn(), "90%" );
        var instr14 = ""
         + "Located on the bottom horizontal toolbar which appears on the visualization screen, "
         + "this button scales in, or zooms, in."
        v14[3].innerHTML = instr14;
        
        
        var v15 = addSection( sections, 30,"Control "+(STEPS++)  );
        UT.setBGSVGnot64( v15[2] , ZoomOut(), "90%" );
        var instr15 = ""
         + "Located on the bottom horizontal toolbar which appears on the visualization screen, "
         + "this button scales in, or zooms, out."  
        v15[3].innerHTML = instr15;
      
        
        var v16 = addSection( sections, 30,"Control "+(STEPS++)  );
        UT.setBGSVGnot64( v16[2] , PointUp(), "90%" );
        var instr16 = ""
         + "Located on the bottom horizontal toolbar which appears on the visualization screen, "
         + "this button shifts the visualization vertically up."  
        v16[3].innerHTML = instr16;
        
        
        var v17 = addSection( sections, 30,"Control "+(STEPS++)  );
        UT.setBGSVGnot64( v17[2] , PointDown(), "90%" );
        var instr17 = ""
         + "Located on the bottom horizontal toolbar which appears on the visualization screen, "
         + "this button shifts the visualization vertically down."  
        v17[3].innerHTML = instr17;
        
        
        var v18 = addSection( sections, 30,"Control "+(STEPS++)  );
        UT.setBGSVGnot64( v18[2] , PointRight(), "90%" );
        var instr18 = ""
         + "Located on the bottom horizontal toolbar which appears on the visualization screen, "
         + "this button shifts the visualization horizontally right."
        v18[3].innerHTML = instr18;
        
        
        var v19 = addSection( sections, 30,"Control "+(STEPS++)  );
        UT.setBGSVGnot64( v19[2] , PointLeft(), "90%" );
        var instr19 = ""
         + "Located on the bottom horizontal toolbar which appears on the visualization screen, "
         + "this button shifts the visualization horizontally left."
        v19[3].innerHTML = instr19;
        
        
        var v20 = addSection( sections, 30,"Control "+(STEPS++)  );
        UT.setBGSVGnot64( v20[2] , TRASH(), "90%" );
        var instr20 = ""
         + "Located on the spreadsheet page to the top left of the table, "
         + "this button simply erases data that is in the table."
        v20[3].innerHTML = instr20;
        
        
        var v21 = addSection( sections, 30,"Removing Columns "  );
        UT.setBG( v21[2], "#000000");
        var instr21 = ""
         + "Located on paste pop-up, the Remove Columns dialog box can take a single column number "
         + "or multiple, delimited by comma. For example to remove column one and two; input: 1, 2. "
        v21[3].innerHTML = instr21;
        
        
        var v22 = addSection( sections, 30,"Long Loading Error"  );
        UT.setBG( v22[2], "#000000");
        var instr22 = ""
         + "Datasets, with 32 columns, and 4177 rows, have loading times under 30 seconds. "
         + "If loading takes much longer, refresh and double check you input the correct number of columns. "
         + "If using your own dataset, check for data anomalies."
        v22[3].innerHTML = instr22;
        
        var v22 = addSection( sections, 30,"Color Error"  );
        UT.setBG( v22[2], "#000000");
        var instr22 = ""
         + "At this time, datasets having more than 5 classes will work, however will show inaccurate colors. "
         + "This will be expanded in Version 2. "
        v22[3].innerHTML = instr22;

        
    }
    
    
    designInfo();
    
    
    
    window["TABLE"] = DynamicTable( 4, 4 );
    test.appendChild( TABLE.el ); 
    TABLE.setColW((80)+"px");
    TABLE.selectable();
    TABLE.pastable();
    TABLE.keyable();
    
    
    test.appendChild( TABLE.tg ); 
    TABLE.setColW((80)+"px");
    
    
    
    var clear_btn = UT.quickBtn();
    TABLE.el.style.marginTop = "50px";
    clear_btn.style.position  = "absolute";
    clear_btn.style.left  = "110px";
    clear_btn.style.position  = "absolute";
    clear_btn.style.backgroundColor  = "transparent";
    UT.setBGSVGnot64( clear_btn , TRASH(), "75%" ); 

    clear_btn.onclick = function(){
        if( isDataAdded() === false ){
          alert("No data added to erase."); 
        } else {
            resetTable();
        }
    }
    
    
    TABLE.el.parentNode.appendChild(  clear_btn );
    

    if( EXTENTION_1_INPUT ){
        var add_row = UT.quickBtn();
        var rmv_row = UT.quickBtn();
        var add_col = UT.quickBtn();
        var rmv_col = UT.quickBtn();
        
        
        TABLE.el.parentNode.appendChild(  add_row );
        TABLE.el.parentNode.appendChild(  rmv_row );
        TABLE.el.parentNode.appendChild(  add_col );
        TABLE.el.parentNode.appendChild(  rmv_col );
        
        add_row.style.position = "absolute";
        add_row.style.left = "110px";
        add_row.style.backgroundColor = "transparent";
        add_row.style.top = "100px";
        UT.setBGSVGnot64( add_row , TESTP(), "40%" ); 
    
        rmv_row.style.position = "absolute";
        rmv_row.style.left = "110px";
        rmv_row.style.top = "50px";
        rmv_row.style.backgroundColor = "transparent";
        UT.setBGSVGnot64( rmv_row , TESTM(), "40%" ); 
    
        add_col.style.position = "absolute";
        add_col.style.left = "210px";
        add_col.style.backgroundColor = "transparent";
        UT.setBGSVGnot64( add_col , TESTP(), "40%" ); 
        
        rmv_col.style.position = "absolute";
        rmv_col.style.left = "160px";
        rmv_col.style.backgroundColor = "transparent";
        UT.setBGSVGnot64( rmv_col , TESTM(), "40%" ); 
        
        
        
    
        add_col.onclick = function(){
            var c = TABLE.c*1;
            TABLE.setColN( c + 1 );
        }
        
        add_row.onclick = function(){
            var r = TABLE.r*1;
            TABLE.setRowN( r + 1 );
        }
        
        rmv_col.onclick = function(){
            var c = TABLE.c*1;
            if( c <= 2 ) return;
            TABLE.setColN( c - 1 );
        }
        
        rmv_row.onclick = function(){
            var r = TABLE.r*1;
            if( r <= 2 ) return;
            TABLE.setRowN( r - 1 );
        }
    
    }
    
    /*
         //Ob.toolbar    = BasicToolbar;
        //Ob.display    = BasicDisplay;
        Ob.viewer     = BasicViewer;
        Ob.control    = BasicControl;
        
        */
        
    
    //ParallelVis.viewer.el.innerHTML = lotsoftext();
    //ParallelVis.control.el.innerHTML = lotsoftext();
    
    var bs = addtempbuttons( footerB );
    turnOnInfo();
    
    function turnOnDistributed(){
        collapsed.style.width = (( COLUMNS * 50 ) + 500) + "px";
        setAllWhite();
        bs[0].style.borderTop = "5px solid "+GREY_2;
        showCollapsed();
        BasicVis.display.el.style.backgroundColor = "white";
        BasicVis.show();
        ParallelVis.hide();
        footerT.style.display = "none";
        toolbar.style.display = "none";
        placeholder1.style.display = "";
        Info.hide();
        //hideCollapsed();
        //
        //ParallelVis.hide();
        //DcpFpprVis.hide();
    }
    BasicVis.on = function(){
      turnOnDistributed();
    }
    
    function turnOnParallel(){
        collapsed.style.width = (( COLUMNS * 100 ) + 300 ) + "px";
        setAllWhite();
        bs[1].style.borderTop = "5px solid "+GREY_2;
        showCollapsed();
        setBodySectionHeight("100px");
        BasicVis.hide();
        placeholder1.style.display = "";
        //DcpFpprVis.hide();
        footerT.style.display = "";
        toolbar.style.display = "";
        ParallelVis.show();
        Info.hide();
        UT.setDsp( ParallelVis.viewer.el.parentNode.parentNode, "none");
    }
    
    function setAllWhite(){
      bs[0].style.borderTop = "5px solid white";
      bs[1].style.borderTop = "5px solid white";
      bs[2].style.borderTop = "5px solid white";
    }
    function turnOnInfo(){
        collapsed.style.width = ( 1000  ) + "px";
        setAllWhite();
        bs[2].style.borderTop = "5px solid "+GREY_2;
        showCollapsed();
        footerT.style.display = "none";
        toolbar.style.display = "none";
        //setBodySectionHeight("100px");
        BasicVis.hide();
        ParallelVis.hide();
        Info.show();
        
        placeholder1.style.display = "none";
        //UT.setDsp( ParallelVis.viewer.el.parentNode.parentNode, "");
    }

    
    bs[0].onclick = function(){
        setAllWhite();
        bs[0].style.borderTop = "5px solid "+GREY_2;
        turnOnDistributed(); 
        
    }
    bs[1].onclick = function(){
        if(!isDataAdded()){ alert("Click button to the left, then click on empty spreadsheet, then paste data into it."); } else {
            loadingScreenOn();
            var temp = [], col;
            for( var i = 0 ; i < DATA.length; i++ ){
                col = [];
                for( var j = 0 ; j < DATA[i].length; j++ ){
                    col.push( TABLE.getV( j, i ) );
                }
                temp.push( col ); 
            }
            
            DATA = normalize( temp );
            turnOnParallel();
            loadingScreenOff();
        }
    }
    bs[2].onclick = function(){
      
      turnOnInfo();
      //resetVis();
      
      
    }
    
    //UT.setDsp( bs[0], "none");
    //UT.setDsp( bs[1], "none");
    //turnOnParallel();
    

    
    
    
    var TranslationBar = {};
        TranslationBar.zoom = 1.0;
        TranslationBar.x = 0.0;
        TranslationBar.y = 0.0;
    UT.setBG( footerT, "white" );
    
    var shiftXP, shiftXN, shiftYP, shiftYN, zoomIn, zoomOut;
    
    shiftXP = UT.quickBtn();
    shiftXN = UT.quickBtn();
    shiftYP = UT.quickBtn();
    shiftYN = UT.quickBtn();
    zoomIn  = UT.quickBtn();
    zoomOut = UT.quickBtn();
    
    
    
    UT.setBGSVGnot64( shiftXP , PointRight(), "40%" ); 
    UT.setBGSVGnot64( shiftXN , PointLeft(), "40%"  ); 
    UT.setBGSVGnot64( shiftYP , PointDown(), "40%"  ); 
    UT.setBGSVGnot64( shiftYN , PointUp(), "40%"  ); 
    UT.setBGSVGnot64( zoomIn  , ZoomIn(), "40%"  ); 
    UT.setBGSVGnot64( zoomOut , ZoomOut(), "40%"  ); 
    
    var controls = [  shiftXP,shiftXN, shiftYP, shiftYN, zoomIn, zoomOut ];
    var sum = 0, at = (50 * 6) / 2;
    for(var i = 0 ; i < controls.length; i++ ){
        footerT.appendChild(controls[i]);
        UT.setBG( controls[i], "transparent");
        ////console.log( "calc(50% + "+( at + (sum-=50))+"px)" ); 
        UT.setL( controls[i], "calc(50% + "+( at + (sum-=100))+"px)");
    }
    
        
    zoomOut.onclick = function(){
        var el = ParallelVis.display.el;
        UT.setPos( el, "absolute" );
        UT.setL( el, 0 );
        TranslationBar.zoom-=0.1;
        transform( el, TranslationBar ); 
    }
    zoomIn.onclick = function(){
        var el = ParallelVis.display.el;
        UT.setPos( el, "absolute" );
        UT.setL( el, 0 );
        TranslationBar.zoom+=0.1;
        transform( el, TranslationBar ); 
    }  
    shiftXN.onclick = function(){
        var el = ParallelVis.display.el;
        UT.setPos( el, "absolute" );
        TranslationBar.x -= 10;
        transform( el, TranslationBar ); 
    }
    shiftXP.onclick = function(){
        var el = ParallelVis.display.el;
        UT.setPos( el, "absolute" );
        TranslationBar.x += 10;
        transform( el, TranslationBar ); 
    }
    shiftYP.onclick = function(){
        var el = ParallelVis.display.el;
        UT.setPos( el, "absolute" );
        TranslationBar.y += 10;
        transform( el, TranslationBar ); 
    }
    shiftYN.onclick = function(){
        var el = ParallelVis.display.el;
        UT.setPos( el, "absolute" );
        TranslationBar.y -= 10;
        transform( el, TranslationBar ); 
    }
       
}




function transform ( el, TranslationBar ) {
    var sc = TranslationBar.zoom;
    var x =  TranslationBar.x;
    var y =  TranslationBar.y;
    var transfromString           = "scale("+( sc )+") TranslateX("+( x )+"px)  TranslateY("+( y )+"px)";
    el.style.transformOrigin      = "left top";
    el.style['-moz-transform']    = transfromString;
    el.style['-webkit-transform'] = transfromString;
    el.style['-o-transform']      = transfromString;
    el.style['-ms-transform']     = transfromString;
    el.style['transform']         = transfromString;
      
}



function setTransform (element, rotationArg, scaleArg, skewXArg, skewYArg) {
    var transfromString = ("rotate(" + rotationArg + "deg ) scale(" + scaleArg
        + ") skewX(" + skewXArg + "deg ) skewY(" + skewYArg + "deg )");

    // now attach that variable to each prefixed style
    element.style.webkitTransform = transfromString;
    element.style.MozTransform = transfromString;
    element.style.msTransform = transfromString;
    element.style.OTransform = transfromString;
    element.style.transform = transfromString;
}




function addSections(){
      var screen = VIEWS.get(0);
      var SECTIONS = [ newRel("auto","300px" ), newRel("100%","auto" )  ];
      for( var i = 0 ; i < SECTIONS.length; i++ ){
          SECTIONS[i].overflowX = "none";
          screen.el.appendChild( SECTIONS[i] );
      }
      UT.setBG( SECTIONS[0], "white" );
      SECTIONS[0].style.display = "none";
      SECTIONS[0].style.minWidth = "1000px";
      SECTIONS[0].style.minHeight = "400px";
      SECTIONS[0].style.overflow = "visible";
      return SECTIONS;
}


function addBasicDisplay( parent ){

    var SUBSECTIONS_1 = [ newRel("100%","100%" ),newRel("100%","100%" ) ];
    for( var i = 0 ; i < SUBSECTIONS_1.length; i++ ){
        parent.appendChild( SUBSECTIONS_1[i] );
        UT.setPos(  SUBSECTIONS_1[i], "absolute");
        SUBSECTIONS_1[i].id = "subsection"+i;
    }
    UT.setBG( SUBSECTIONS_1[0] , "white" );   //n
    UT.setBG( SUBSECTIONS_1[1] , "white" );   //n

    UT.setL(    SUBSECTIONS_1[0], 0);
    UT.setT(    SUBSECTIONS_1[0], 0);
    UT.setW(    SUBSECTIONS_1[0], "250px");
    
    UT.setL(    SUBSECTIONS_1[1], "250px");
    UT.setT(    SUBSECTIONS_1[1], 0);
    UT.setW(    SUBSECTIONS_1[1], "calc(100% - "+(250)+"px)");
    SUBSECTIONS_1[1].style.overflowX = "scroll"
    return SUBSECTIONS_1;
}



function addtempbuttons( footerB, visapp ){
  
    var btn0 =  UT.quickBtn();
    var btn1 =  UT.quickBtn();
    var btn2 =  UT.quickBtn();
    
    footerB.appendChild( btn0 );
    footerB.appendChild( btn1 );
    footerB.appendChild( btn2 );
    
    
    UT.setBG( btn0, "white" ); 
    UT.setBG( btn1, "white" ); 
    UT.setBG( btn2, "white" ); 
    
    
  
    btn0.onclick = function(){
      //alert(1);
    }
    
    btn1.onclick = function(){
      ////alert(2);
      
    }
    
    //UT.setBG( btn0 ,GREY_1 ); 
    //UT.setBG( btn1 ,GREY_1 ); 
    UT.setBGSVGnot64( btn0 , TEST1(), "90%" ); 
    UT.setBGSVGnot64( btn1 , TEST2(), "75%" );
    UT.setBGSVGnot64( btn2 , TESTP3(), "70%" );
    btn1.style.marginLeft = "8px";
    btn2.style.marginLeft = "-5px";
    
    
    
 
 
   
    return [btn0, btn1, btn2];
}
function Part( name ){
   var div = newRel("100%", "100%");
   var obj = {};
          obj.i = 0;
          obj.el = div;
          obj.hide = function(){
              obj.el.style.display = "none";
              return this;
          }
          obj.show = function(){
              obj.el.style.display = "";
              return this;
          }
    return obj;
}
function Toolbar( Ob, name ){
    var obj = Part( name ); 
        Ob.toolbar[ name ] = obj;
        Ob.getToolbarEl().appendChild( obj.el );
    return obj;
}

function Viewer( Ob, name ){
    var obj = Part( name ); 
        Ob.viewer[ name ] = obj;
        Ob.getViewerEl().appendChild( obj.el );
    return obj;
}
function Control( Ob, name ){
    var obj = Part( name ); 
        Ob.control[ name ] = obj;
        Ob.getControlEl().appendChild( obj.el );
    return obj;
}

function Display( Ob, name ){
    var obj = Part( name ); 
        Ob.display[ name ] = obj;
        Ob.getDisplayEl().appendChild( obj.el );
    return obj;
}

function screenInit(){
  
   VIEWS.newView().on();
}

function loadingScreenInitOn(){
    window["LOADING_SCREEN"] = COMPS.loadingPopup();
    LOADING_SCREEN.set("Loading");
    document.body.appendChild( LOADING_SCREEN.pr ); 
}

function loadingScreenInit(){
    window["LOADING_SCREEN"] = COMPS.loadingPopup();
}
function loadingScreenOn(){
    LOADING_SCREEN.set("Loading");
    document.body.appendChild( LOADING_SCREEN.pr ); 
}
function loadingScreenOff(){
    LOADING_SCREEN.set("Complete");
    document.body.removeChild( LOADING_SCREEN.pr ); 
}
function webappInit(){
    window["VisApe"]  = VisApeWebApp( VIEWS.get(0) );
}





function addHeaderPlaceHolders(){
    var screen = VIEWS.get(0);
    var PLACE_HOLDERS = [ newRel("100%","50px" ),newRel("100%","50px" ) ];
    for( var i = 0 ; i < PLACE_HOLDERS.length; i++ ){
        var B = 2;
        UT.setBG     (PLACE_HOLDERS[i], "transparent");
        screen.el.appendChild( PLACE_HOLDERS[i] );
    }
    return PLACE_HOLDERS;
}

function addHeaders2XFooters2X(){
    var screen = VIEWS.get(0);
    var FIXED = [newFixT( "100%","50px",0,0), newFixT( "100%","50px",0,"50px"), newFixB( "100%","50px",0,0), newFixB( "100%","40px",0,"50px")];
    for( var i = 0 ; i < FIXED.length; i++ ){
        FIXED[i].overflowX = "none";
        FIXED[i].overflowX = "none";
        screen.el.appendChild( FIXED[i] );
        UT.setBG     (FIXED[i], "white");
        UT.setMrg     (FIXED[i], "0");
    } 
    UT.setBG     (FIXED[2], "transparent");
    UT.setBG     (FIXED[3], "transparent");
    return FIXED;
}


function mainHeaderStyle( parent ){

    var width = 50;
    var anchor = document.createElement("a");
    UT.setPos( anchor, "absolute"); 
    UT.setW( anchor, (300)+"px"); 
    UT.setL( anchor, "0"); 
    UT.setT( anchor, "0"); 
    UT.setH( anchor, (width)+"px"); 
    
    
    anchor.style["-webkit-touch-callout"] = "none";
    anchor.style["-webkit-user-select"] = "none";
    anchor.style["-khtml-user-select"] = "none";
    anchor.style["-moz-user-select"] = "none";
    anchor.style["-ms-user-select"] = "none";
    anchor.style["user-select"] = "none";
      
    //anchor.href = "https://www.visape.com/members/index.html";
    parent.appendChild( anchor );
    
    window["APE"] = newEl("50%","100px","div");
    UT.setPos( APE, "absolute"); 
    UT.setW( APE, (width)+"px"); 
    UT.setL( APE, "0"); 
    UT.setT( APE, "0"); 
    UT.setH( APE, (width)+"px"); 
    //UT.setO( APE, 1); 
    UT.setBGSVG( APE , Ape(), "100%" ); 
    anchor.appendChild( APE ); 

 

    window["TITLE"] = newEl("50%","100px","p");
    UT.setPos( TITLE, "absolute"); 
    UT.setW( TITLE, "500px"); 
    UT.setH( TITLE, "auto"); 
    UT.setT( TITLE, "0"); 
    UT.setL( TITLE, "60px"); 
    UT.rmvMargins( TITLE );
    
    UT.setBG( TITLE, "rgba(255,255,255,0.2)" ); 
    //UT.setBor( TITLE, "5px solid "+ GREY_2 );
    TITLE.style.color = GREY_2;
    TITLE.style.fontSize = "50px";
    TITLE.style.fontWeight = "10";
    TITLE.style.textAlign = "left";
    TITLE.style.fontFamily = '"Poppins", sans-serif';
    
    //TITLE.style["-webkit-text-stroke-width"] = "1px";
    //TITLE.style["-webkit-text-stroke-color"] = GREY_1;
    //TITLE.style["-webkit-text-stroke-width"] = "3px";
    //TITLE.style["-webkit-text-stroke-color"] = "black";
    UT.rmvMargins( TITLE );
    TITLE.innerHTML = "Vis Ape";
    UT.setBG( TITLE, "transparent"); 
    anchor.appendChild( TITLE ); 
}


function ViewManager(){
  
  var ob = {};
      ob.ch = [ ];  
      ob.fn = [ ]; // 2D add arrays only
      ob.run = function( index ){
          var L = ob.fn[ index ].length;
          for( var i = 0; i < L; i++ ){
              ob.fn[index][i]();
            
          }
      }
      ob.get = function( index ){
        return ob.ch[index];
      }
      ob.go = function( page_index ){
          if( page_index === undefined ) return false;
          for( var i = 0 ; i < this.ch.length; i++ ){
              ob.ch[i].off();
          }
          ob.ch[page_index].on();
          window.scrollTo(0, 0);
          ob.run( page_index ); 
          return ob;
      }
      ob.newView = function( n ){
          if(n === undefined ) n = 1;
          var div;
          for(var i = 0 ; i < n; i++ ){
              div = BlanketScreenWidget().init().off();
              ob.ch.push( div );
              div.i = ob.fn.length;
              ob.fn.push([function(){}]); // place holder, 2D array
          }
          return ob.ch[ ob.ch.length-1 ];
      }
      ob.extend = function( screen, fcn ){
          ob.fn[ screen.i ].push( fcn ); 
      }
      return ob;
}
  



function BlanketScreenWidget(){
    var Ob = newOb("BlanketScreenWidget");
    Ob.mask = undefined;
    Ob.CNST.HEADER_HEIGHT = 0;
    Ob.init = function(){
        var el = document.createElement("div");
        el.style.position = "absolute";
        el.style.width = "100%";
        el.style.height =  "100%" + "px";//"1000" + "px";
        el.style.top = this.CNST.HEADER_HEIGHT+"px";
        el.style.left = 0;
        //el.style.backgroundColor = "#e3e3e3";
        el.style.display= "";
        document.body.appendChild( el );
        Ob.el = el;
        return this;
    };
    Ob.ch = [];
    Ob.getCh = function(){ return Ob.ch; };
    Ob.getDc = function(){
        var build = [], L = Ob.getCh().length;
        for( var i = 0; i < L; i++ ){
            L2 = Ob.getCh()[i].getCh().length;
            for( var j = 0; j < L2; j++ ){
                build.push( Ob.getCh()[i].getCh()[j] );
            }  
        }
        return build;
    };
    Ob.zombify = function( fcn, i, list  ){ 
        //////alert("3. "+list);
        var ch = Ob.getDc(), L = ch.length;
        var ALL = i === undefined, ONE = !ALL;
        if( ALL ){ for( var i = 0; i < L; i++ ){ fcn( ch[i], MASKS, list );} } else
        if( ONE ){ fcn( ch[i], MASKS, list ); }
    };
    Ob.add = function( child ){ Ob.ch.push( child ); };
    Ob.on = function(){Ob.el.style.display = ""; return this;};
    Ob.off = function(){ Ob.el.style.display = "none"; return this;};
    Ob.init();
    Ob.off();
    return Ob;
}

function TextFieldGoogle( el, value ){
    
    var W = 300;
    if( el === undefined ) el = newEl( "100%", "300px", "div"); 
    var id = UT.regX.removeSpaces( value );
    var lbl = document.createElement("LABEL");
    lbl.className = "pure-material-textfield-outlined";
    lbl.innerHTML = '<input id="'+id+'" placeholder=" "><span>'+ value +'</span>';
    lbl.style.marginTop = "10px";
    lbl.style.width= W+"px";
    lbl.style.marginLeft = "calc(50% - "+(W/2)+"px)";
    el.appendChild( lbl );
    
    
    var ob = {};
        ob.el = el;
        ob.pr = lbl;
        ob.get = function(){
            var index1 = lbl.innerHTML.indexOf("<span>"); 
            if( index1.length > 0 ) index += ("<span>").length;
            var index2 = lbl.innerHTML.indexOf("</span>");
            var val = lbl.innerHTML.substring( index1, index2 ); 
            return val;
           
          
        }
    //return lbl;
    return ob;
}

function ButtonGoogle( el, value ){
    var id = UT.regX.removeSpaces( value );
    var lbl = document.createElement("LABEL");
    lbl.className = "pure-material-textfield-outlined";
    lbl.innerHTML = '<input readonly id="'+id+'" placeholder=" "><span id='+(id+"_"+"ch")+'>'+ value +'</span>';
    lbl.style.marginTop = "10px";
    lbl.style.width= "80%";
    lbl.style.marginLeft = "10%"
    el.appendChild( lbl );
    
    var cover = document.createElement("div");
    cover.id = id + "_cover";
    cover.style.width = "100%";
    UT.setH( cover, "70px");
    UT.setPos( cover, "absolute");
    UT.setL( cover, "0");
    UT.setT( cover, "6px");
    UT.setBG( cover, "transparent");
    lbl.appendChild( cover );
    return lbl;
}
function RadioExplode( name ){
      var n = UT.count();
      var radio_link_name = name;//"CLASS_ATTRIBUTE";
      var radio_id = "TEMP_ID"+n;
      
      var label = UT.HTMLToDiv('<label id="'+(radio_id)+'"><input type="radio" class="radioExplode-option-input radioExplode-radio '
                                            +'radioExplode" name="'+(radio_link_name)+'"/></label>', id = radio_id ); 
                                            
                                            
      
      label.style.display = "block" ; 
      label.style.padding = "10px";
      label.style.width = "100%" ;
      label.style.height = "100%" ;
      label.style.cursor = "pointer";
      
      var ob = {};
          ob.el = label;
   return ob;
}


      
      
      
      
      
      
      
      
      
      function newAbs( w, h ){
          var id = "container"+(UT.count());
          var el = newEl( "0" , "0", "div");
          el.style.backgroundColor = "white";
          el.style.height   = h;
          el.style.left   = 0;
          el.style.top    = 0;
          el.style.width    = w;
          el.style.position  = "absolute";
          el.id             = id;
          //el.className      = "shadowEffect1";
          return el;
      }
      
      
      function newRel( w, h ){
          var id = "container"+(UT.count());
          var el = newEl( "0" , "0", "div");
          el.style.backgroundColor = "white";
          el.style.height   = h;
          el.style.width    = w;
          el.style.display  = "block";
          el.style.position  = "relative";
          el.id             = id;
          //el.className      = "shadowEffect1";
          return el;
      }
      
      
      




function DatainputSVG(){
  
var mySVG = '<svg version="1.1" id="Capa_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path style="fill:#B3FFFF;" d="M512,86.225v339.56c0,24.904-20.265,45.169-45.169,45.169H45.309c-24.904,0-45.169-20.265-45.169-45.169V86.225c0-24.914,20.265-45.179,45.169-45.179h421.521C491.735,41.045,512,61.311,512,86.225z"/><path style="fill:#51FAFF;" d="M512,86.225v339.56c0,24.904-20.265,45.169-45.169,45.169H256.07V41.045h210.761C491.735,41.045,512,61.311,512,86.225z"/><path style="fill:#4BB9EC;" d="M511.86,170.445v-29.993H391.178V41.045h-29.993v99.407h-90.119V41.045h-29.993v99.407h-91.479V41.045h-29.993v99.407H0v29.993h119.602v66.774H0v29.993h119.602v71.313H0v29.993h119.602v102.436h29.993V368.519h91.479v102.436h29.993V368.519h90.119v102.436h29.993V368.519H511.86v-29.993H391.178v-71.313H511.86v-29.993H391.178v-66.774L511.86,170.445L511.86,170.445z M241.074,338.526h-91.479v-71.313h91.479V338.526z M241.074,237.219h-91.479v-66.774h91.479V237.219z M361.185,338.526h-90.119v-71.313h90.119L361.185,338.526L361.185,338.526z M361.185,237.219h-90.119v-66.774h90.119L361.185,237.219L361.185,237.219z"/><path style="fill:#00ABE9;" d="M511.86,170.445v-29.993H391.178V41.045h-29.993v99.407h-90.119V41.045H255.93v429.909h15.136V368.519h90.119v102.436h29.993V368.519H511.86v-29.993H391.178v-71.313H511.86v-29.993H391.178v-66.774L511.86,170.445L511.86,170.445z M361.185,338.526h-90.119v-71.313h90.119L361.185,338.526L361.185,338.526z M361.185,237.219h-90.119v-66.774h90.119L361.185,237.219L361.185,237.219z"/><g><path style="fill:#7CC8F0;" d="M89.782,121.256H59.675c-8.282,0-14.996-6.714-14.996-14.996s6.714-14.996,14.996-14.996h30.107c8.282,0,14.996,6.714,14.996,14.996S98.065,121.256,89.782,121.256z"/><path style="fill:#7CC8F0;" d="M210.389,121.256h-30.107c-8.282,0-14.996-6.714-14.996-14.996S172,91.263,180.282,91.263h30.107c8.282,0,14.996,6.714,14.996,14.996S218.671,121.256,210.389,121.256z"/></g><g><path style="fill:#4BB9EC;" d="M331.36,121.256h-30.107c-8.282,0-14.996-6.714-14.996-14.996s6.714-14.996,14.996-14.996h30.107c8.282,0,14.996,6.714,14.996,14.996S339.642,121.256,331.36,121.256z"/><path style="fill:#4BB9EC;" d="M451.402,121.256h-30.107c-8.282,0-14.996-6.714-14.996-14.996s6.714-14.996,14.996-14.996h30.107c8.282,0,14.996,6.714,14.996,14.996S459.684,121.256,451.402,121.256z"/></g><g><path style="fill:#7CC8F0;" d="M89.782,218.825H59.675c-8.282,0-14.996-6.714-14.996-14.996s6.714-14.996,14.996-14.996h30.107c8.282,0,14.996,6.714,14.996,14.996S98.065,218.825,89.782,218.825z"/><path style="fill:#7CC8F0;" d="M89.782,318.906H59.675c-8.282,0-14.996-6.714-14.996-14.996s6.714-14.996,14.996-14.996h30.107c8.282,0,14.996,6.714,14.996,14.996S98.065,318.906,89.782,318.906z"/><path style="fill:#7CC8F0;" d="M89.782,420.775H59.675c-8.282,0-14.996-6.714-14.996-14.996c0-8.282,6.714-14.996,14.996-14.996h30.107c8.282,0,14.996,6.714,14.996,14.996C104.778,414.061,98.065,420.775,89.782,420.775z"/><path style="fill:#7CC8F0;" d="M466.681,41.045H45.169C20.265,41.045,0,61.311,0,86.225v339.56c0,24.904,20.265,45.169,45.169,45.169h421.511c24.914,0,45.179-20.265,45.179-45.169V86.225C511.86,61.311,491.595,41.045,466.681,41.045z M481.867,425.785c0,8.368-6.808,15.176-15.186,15.176H45.169c-8.368,0-15.176-6.808-15.176-15.176V86.225c0-8.368,6.808-15.186,15.176-15.186h421.511c8.378,0,15.186,6.818,15.186,15.186L481.867,425.785L481.867,425.785z"/></g><path style="fill:#4BB9EC;" d="M511.86,86.225v339.56c0,24.904-20.265,45.169-45.179,45.169H256.07v-29.993h210.611c8.378,0,15.186-6.808,15.186-15.176V86.225c0-8.368-6.808-15.186-15.186-15.186H256.07V41.045h210.611C491.595,41.045,511.86,61.311,511.86,86.225z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>';
  return mySVG;
}      
      
      

      
function GraphSVG(){
 var mySVG = '<svg height="511pt" viewBox="1 -15 511.99999 511" width="511pt" xmlns="http://www.w3.org/2000/svg"><path d="m55.804688 160.03125 72.367187 47.027344-8.539063 13.144531-72.371093-47.03125zm0 0" fill="#2c92bf"/><path d="m281.023438 104.929688 67 21.761718-4.84375 14.90625-66.996094-21.757812zm0 0" fill="#2c92bf"/><path d="m457.902344 43.070312 10.945312 11.21875-78.167968 76.234376-10.941407-11.21875zm0 0" fill="#2c92bf"/><path d="m234.113281 117.1875 11.519531 10.628906-79.960937 86.621094-11.515625-10.632812zm0 0" fill="#2c92bf"/><g fill="#ff8e1d"><path d="m0 254.855469h63.199219v226.953125h-63.199219zm0 0"/><path d="m112.199219 327.785156h63.203125v154.023438h-63.203125zm0 0"/><path d="m224.398438 206.234375h63.203124v275.574219h-63.203124zm0 0"/><path d="m336.597656 242.699219h63.203125v239.109375h-63.203125zm0 0"/><path d="m448.800781 133.308594h63.199219v348.5h-63.199219zm0 0"/></g><path d="m63.203125 153.648438c0 17.453124-14.148437 31.601562-31.601563 31.601562-17.453124 0-31.601562-14.148438-31.601562-31.601562 0-17.453126 14.148438-31.601563 31.601562-31.601563 17.453126 0 31.601563 14.148437 31.601563 31.601563zm0 0" fill="#ff491f"/><path d="m512 32.101562c0 17.453126-14.148438 31.601563-31.601562 31.601563-17.453126 0-31.601563-14.148437-31.601563-31.601563 0-17.453124 14.148437-31.601562 31.601563-31.601562 17.453124 0 31.601562 14.148438 31.601562 31.601562zm0 0" fill="#ff491f"/><path d="m399.800781 141.496094c0 17.449218-14.148437 31.597656-31.601562 31.597656s-31.601563-14.148438-31.601563-31.597656c0-17.453125 14.148438-31.601563 31.601563-31.601563s31.601562 14.148438 31.601562 31.601563zm0 0" fill="#ff491f"/><path d="m287.601562 105.03125c0 17.449219-14.148437 31.597656-31.601562 31.597656s-31.601562-14.148437-31.601562-31.597656c0-17.453125 14.148437-31.601562 31.601562-31.601562s31.601562 14.148437 31.601562 31.601562zm0 0" fill="#ff491f"/><path d="m175.402344 226.578125c0 17.453125-14.148438 31.601563-31.601563 31.601563s-31.601562-14.148438-31.601562-31.601563 14.148437-31.601563 31.601562-31.601563 31.601563 14.148438 31.601563 31.601563zm0 0" fill="#ff491f"/></svg>';
return mySVG; 
}      

function CloudSVG64(){
  
  
var mySVG = '<?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-20 20 220 150" style="enable-background:new 0 0 184.979 184.979;" xml:space="preserve"><g  stroke="white" stroke-width="10"><g><path style="fill:#ffffff;" d="M121.539,122.24c0.585,0.585,1.349,0.871,2.112,0.871c0.764,0,1.528-0.292,2.112-0.871c1.164-1.164,1.164-3.055,0-4.219L94.605,86.869c0,0,0,0-0.006-0.006l-2.106-2.106l-2.106,2.106c0,0,0,0-0.006,0.006l-31.159,31.153c-1.164,1.164-1.164,3.055,0,4.219c1.164,1.164,3.055,1.164,4.219,0l26.069-26.063v52.556c0,1.647,1.337,2.983,2.983,2.983c1.647,0,2.983-1.337,2.983-2.983V96.177L121.539,122.24z"/><path style="fill:#ffffff;" d="M151.057,67.673C143.712,47.01,124.32,33.25,102.236,33.25c-20.812,0-39.531,12.518-47.628,31.493c-3.813-1.766-7.96-2.685-12.172-2.685c-16.051,0-29.118,13.044-29.148,29.088C4.941,97.531,0,107.448,0,117.998c0,18.593,15.168,33.719,34.31,33.725c0.215,0,0.43,0.006,0.621,0.006c0.203,0,0.382,0,0.525-0.012h31.445c1.647,0,2.983-1.337,2.983-2.983s-1.337-2.983-2.983-2.983H35.3c-0.292,0.018-0.597,0.006-0.889,0l-0.609-0.006c-15.347,0-27.835-12.447-27.835-27.752c0-9.147,4.511-17.722,12.065-22.925l1.372-1.366l-0.149-2.494c0-12.781,10.4-23.181,23.181-23.181c4.284,0,8.491,1.205,12.166,3.479l3.156,1.957l1.229-3.509c6.432-18.384,23.808-30.729,43.254-30.729c20.073,0,37.639,12.847,43.707,31.976l0.555,1.748l1.814,0.292c17.781,2.876,30.694,18.032,30.694,36.04c0,20.114-16.403,36.475-36.559,36.475h-24.375c-1.647,0-2.983,1.337-2.983,2.983s1.337,2.983,2.983,2.983h24.375c23.45,0,42.526-19.04,42.526-42.442C184.973,88.933,170.814,71.719,151.057,67.673z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>';
var mySVG64 = window.btoa(mySVG);
return mySVG64;
}

function DATASET_1_A(){
var dataset = {}
dataset.data =[
		[0, 0.06, 0.06, 0.06, 0.1, 0.1, 0.1, 0.1, 0.13, 0.13, 0.13, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.19, 0.19, 0.19, 0.19, 0.19, 0.23, 0.23, 0.23, 0.23, 0.23, 0.23, 0.23, 0.23, 0.23, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.29, 0.29, 0.29, 0.29, 0.29, 0.29, 0.29, 0.29, 0.29, 0.29, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.39, 0.39, 0.39, 0.39, 0.39, 0.39, 0.39, 0.39, 0.39, 0.39, 0.39, 0.39, 0.39, 0.42, 0.42, 0.42, 0.42, 0.42, 0.42, 0.45, 0.45, 0.45, 0.45, 0.45, 0.45, 0.45, 0.45, 0.45, 0.45, 0.45, 0.45, 0.48, 0.48, 0.48, 0.48, 0.48, 0.52, 0.52, 0.52, 0.55, 0.55, 0.55, 0.58, 0.58, 0.58, 0.58, 0.58, 0.58, 0.61, 0.61, 0.65, 0.68, 0.71, 0.77, 1],
		[0, 0.02, 0.03, 0.03, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.12, 0.12, 0.12, 0.12, 0.15, 0.15, 0.34, 0.39, 0.39, 0.42, 0.42, 0.42, 0.44, 0.46, 0.47, 0.49, 0.49, 0.49, 0.51, 0.51, 0.51, 0.51, 0.51, 0.53, 0.53, 0.53, 0.54, 0.54, 0.54, 0.54, 0.56, 0.56, 0.58, 0.58, 0.58, 0.58, 0.59, 0.59, 0.59, 0.59, 0.59, 0.59, 0.59, 0.59, 0.61, 0.61, 0.61, 0.63, 0.63, 0.63, 0.63, 0.63, 0.64, 0.64, 0.64, 0.64, 0.66, 0.66, 0.66, 0.66, 0.66, 0.68, 0.68, 0.68, 0.68, 0.69, 0.69, 0.69, 0.69, 0.69, 0.69, 0.69, 0.69, 0.71, 0.71, 0.73, 0.73, 0.75, 0.75, 0.76, 0.76, 0.76, 0.78, 0.78, 0.78, 0.78, 0.78, 0.78, 0.8, 0.8, 0.8, 0.81, 0.81, 0.81, 0.83, 0.83, 0.85, 0.85, 0.86, 0.86, 0.86, 0.9, 0.92, 0.95, 0.97, 0.97, 1],
		[0, 0, 0, 0, 0, 0, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12, 0.17, 0.21, 0.37, 0.37, 0.37, 0.37, 0.37, 0.37, 0.37, 0.42, 0.42, 0.42, 0.46, 0.46, 0.46, 0.46, 0.46, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.54, 0.54, 0.54, 0.54, 0.54, 0.54, 0.54, 0.54, 0.54, 0.58, 0.58, 0.58, 0.58, 0.58, 0.58, 0.58, 0.58, 0.58, 0.58, 0.58, 0.58, 0.62, 0.62, 0.62, 0.62, 0.67, 0.67, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.71, 0.75, 0.75, 0.75, 0.75, 0.75, 0.79, 0.79, 0.79, 0.79, 0.79, 0.79, 0.83, 0.83, 0.83, 0.83, 0.83, 0.83, 0.88, 0.88, 0.88, 0.92, 0.92, 0.92, 0.92, 0.92, 0.92, 0.92, 0.92, 0.96, 0.96, 0.96, 1, 1, 1],
		[0, 0.03, 0.03, 0.03, 0.06, 0.08, 0.08, 0.08, 0.08, 0.11, 0.11, 0.14, 0.14, 0.14, 0.14, 0.14, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.19, 0.19, 0.19, 0.19, 0.19, 0.19, 0.19, 0.19, 0.19, 0.19, 0.22, 0.22, 0.22, 0.22, 0.22, 0.22, 0.22, 0.22, 0.25, 0.25, 0.25, 0.25, 0.28, 0.31, 0.31, 0.31, 0.31, 0.31, 0.31, 0.33, 0.33, 0.33, 0.33, 0.33, 0.33, 0.33, 0.36, 0.36, 0.36, 0.36, 0.36, 0.36, 0.39, 0.39, 0.39, 0.39, 0.39, 0.39, 0.39, 0.39, 0.42, 0.42, 0.42, 0.42, 0.42, 0.42, 0.42, 0.44, 0.44, 0.44, 0.47, 0.47, 0.47, 0.47, 0.47, 0.47, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.53, 0.53, 0.53, 0.53, 0.56, 0.56, 0.56, 0.56, 0.56, 0.56, 0.56, 0.56, 0.56, 0.58, 0.58, 0.58, 0.58, 0.58, 0.58, 0.58, 0.61, 0.61, 0.61, 0.61, 0.61, 0.64, 0.64, 0.67, 0.67, 0.67, 0.67, 0.67, 0.67, 0.67, 0.67, 0.69, 0.69, 0.69, 0.72, 0.72, 0.72, 0.72, 0.75, 0.78, 0.81, 0.81, 0.81, 0.83, 0.86, 0.92, 0.94, 0.94, 0.94, 0.94, 1, 1]
	];
	
	
	dataset.targets =[
		[1, 1, 1, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 0, 0, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 1, 1, 1, 1, 1, 2, 0, 1, 1, 1, 2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,2]
	];

return dataset;};




function Ape(){
var svg = 
'<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd" [<!ENTITY st0 "fill:#DEDEDD;"><!ENTITY st1 "fill:#231F20;"><!ENTITY st2 "fill:url(#XMLID_2_);"><!ENTITY st3 "fill:#FFFFFF;"><!ENTITY st4 "fill:none;"><!ENTITY st5 "fill:#6E6D6E;"><!ENTITY st6 "fill:#808080;"><!ENTITY st7 "fill:#454545;"><!ENTITY st8 "fill:url(#XMLID_3_);"><!ENTITY st9 "fill:url(#XMLID_4_);"><!ENTITY st10 "fill:#2D2E2D;"><!ENTITY st11 "fill:#5C464F;"><!ENTITY st12 "fill:#392B31;"><!ENTITY st13 "fill:url(#XMLID_5_);"><!ENTITY st14 "fill:url(#XMLID_6_);"><!ENTITY st15 "fill:url(#XMLID_7_);"><!ENTITY st16 "fill:#D8D9D8;">]><svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve"><g><path id="XMLID_382_" style="&st0;" d="M44.73,18.218c0,0,0.97,4.825-0.652,14.299c0,0-0.564-0.998-0.8-0.847c0,0,1.556,8.391-7.206,12.381c0,0,0.205-1.354-0.101-1.591c0,0,0.22,2.218-4.454,4.217c-6.009,1.938-9.742,1.556-9.742,1.556c0.954-0.4,1.213-1.871,1.219-1.915c-0.066,0.031-1.38,0.69-3.339,0.359c-2.006-0.337-4.453-4.217-4.453-4.217c-0.302,0.236-0.101,1.591-0.101,1.591C6.339,40.061,7.898,31.67,7.898,31.67c-0.239-0.151-0.803,0.847-0.803,0.847c-1.622-9.474-0.652-14.299-0.652-14.299c-0.428,0-1.014,0.746-1.014,0.746c0.113-2.709,2.419-5.78,2.419-5.78c-0.17-0.17-0.932,0.085-0.932,0.085C12.431,1.837,23.369,2.196,23.369,2.196s1.068,0.098,2.217,0.346c1.15-0.249,2.217-0.346,2.217-0.346S39.35,2.76,44.865,14.193c0,0-0.759-0.255-0.929-0.085c0,0,1.698,2.148,1.811,4.857C45.747,18.964,45.158,18.218,44.73,18.218z"/><g><g id="XMLID_290_"><path id="XMLID_381_" style="&st1;" d="M43.751,18.463c0,0,0.92,4.578-0.619,13.568c0,0-0.535-0.947-0.759-0.804c0,0,1.476,7.961-6.838,11.748c0,0,0.194-1.285-0.096-1.509c0,0,0.209,2.104-4.226,4.002c-5.701,1.838-9.243,1.476-9.243,1.476c0.906-0.38,1.151-1.775,1.157-1.817c-0.063,0.03-1.309,0.654-3.168,0.341c-1.904-0.32-4.226-4.002-4.226-4.002c-0.287,0.224-0.096,1.509-0.096,1.509c-8.314-3.786-6.835-11.748-6.835-11.748c-0.227-0.143-0.762,0.804-0.762,0.804c-1.539-8.989-0.619-13.568-0.619-13.568c-0.406,0-0.962,0.708-0.962,0.708c0.108-2.57,2.295-5.484,2.295-5.484c-0.161-0.161-0.885,0.081-0.885,0.081C13.104,2.92,23.483,3.26,23.483,3.26s1.013,0.093,2.104,0.329c1.091-0.236,2.104-0.329,2.104-0.329s10.956,0.535,16.188,11.383c0,0-0.72-0.242-0.882-0.081c0,0,1.611,2.038,1.718,4.608C44.716,19.171,44.157,18.463,43.751,18.463z"/><path id="XMLID_379_" style="&st1;" d="M28.49,25.006c1.941,0.614,2.293,2.697,2.293,2.697l0.767-0.461c0,0,2.455,6.556-2.51,9.878c0,0,0.132-0.527-0.066-0.543c0,0-1.562,0.92-3.388,0.854V25.006C25.587,25.006,26.548,24.392,28.49,25.006z"/><path id="XMLID_378_" style="&st1;" d="M29.041,37.119c0,0,0.132-0.526-0.066-0.541c0,0-1.563,0.92-3.389,0.855c-1.823,0.066-3.386-0.855-3.386-0.855c-0.197,0.015-0.066,0.541-0.066,0.541c-4.967-3.32-2.51-9.877-2.51-9.877l0.765,0.46c0,0,0.353-2.083,2.295-2.699c1.942-0.613,2.902,0,2.902,0s0.962-0.613,2.905,0c1.94,0.616,2.292,2.699,2.292,2.699l0.768-0.46C31.552,27.243,34.005,33.799,29.041,37.119z"/><linearGradient id="XMLID_2_" gradientUnits="userSpaceOnUse" x1="30.0036" y1="17.7128" x2="34.9017" y2="17.7128"><stop offset="0" style="stop-color:#4DC8ED"/><stop offset="0.9929" style="stop-color:#2B5CAA"/></linearGradient><path id="XMLID_377_" style="&st2;" d="M30.004,18.194c0.427,1.085,3.165,1.79,4.372,0.427c1.207-1.366-0.042-2.567-0.042-2.567l-0.302,0.126l-0.377,0.155l-0.983,0.409c0.278-0.006,0.502,0.131,0.66,0.248c0.155,0.117,0.559,0.741-0.52,1.207c-1.076,0.469-1.24-0.72-1.24-0.72l-0.92,0.418l-0.553,0.251L30.004,18.194z"/><path id="XMLID_376_" style="&st3;" d="M28.448,25.664c1.009,0.164,1.656,0.801,1.644,1.315c-0.011,0.5-1.192,2.923-1.267,3.074c0.367-0.98-0.093-3.425-0.093-3.425l-0.58,0.559c-0.932-0.263-2.566,0.055-2.566,0.055v-1.578C25.587,25.664,27.439,25.499,28.448,25.664z"/><path id="XMLID_375_" style="&st4;" d="M29.837,22.764c-0.42,0.247-0.55,0.197-1.142,0.066c-0.592-0.132-1.546,0.148-1.809,0.132c-0.263-0.016-0.411-0.313-0.295-0.477c0.091-0.132,2.26-1.018,3.13-1.37c0.224-0.089,0.477,0.014,0.578,0.233C30.659,22.123,30.202,22.55,29.837,22.764z"/><path id="XMLID_374_" style="&st4;" d="M28.49,25.006c1.941,0.614,2.293,2.697,2.293,2.697l0.767-0.461c0,0,2.455,6.556-2.51,9.878c0,0,0.132-0.527-0.066-0.543c0,0-1.562,0.92-3.388,0.854V25.006C25.587,25.006,26.547,24.392,28.49,25.006z"/><path id="XMLID_368_" style="&st5;" d="M33.404,24.819c-0.003-0.015-0.003-0.021-0.003-0.021c-0.263,0.849-1.548,1.494-1.629,1.533c2.89-4.835-1.351-6.775-2.833-6.377c-0.929,0.245-1.56,0.938-1.901,1.417c-0.221,0.308-0.577,0.49-0.956,0.49h-0.992c-0.38,0-0.735-0.182-0.956-0.49c-0.341-0.478-0.971-1.171-1.901-1.417c-1.482-0.397-5.723,1.542-2.833,6.377c-0.081-0.039-1.366-0.684-1.629-1.533c0,0,0,0.006-0.003,0.021c-0.114,0.571-2.316,12.414,5.418,16.939c0,0,0-0.592,0.377-0.592c0,0,1.121,0.738,2.023,0.738c0.903,0,2.023-0.738,2.023-0.738c0.377,0,0.377,0.592,0.377,0.592C35.721,37.233,33.518,25.39,33.404,24.819z M26.591,22.485c0.006-0.009,0.024-0.021,0.048-0.036c0.338-0.215,2.271-1.007,3.081-1.336c0.057-0.021,0.114-0.033,0.17-0.03h0.003c0.102,0.003,0.2,0.039,0.278,0.102c0.003,0,0.006,0.003,0.009,0.006c0.048,0.042,0.09,0.093,0.12,0.155c0.359,0.777-0.099,1.204-0.463,1.417c-0.418,0.248-0.55,0.197-1.142,0.066c-0.592-0.131-1.545,0.149-1.808,0.131C26.621,22.945,26.474,22.649,26.591,22.485z M20.874,21.346c0.03-0.063,0.072-0.114,0.12-0.155c0.003-0.003,0.006-0.006,0.009-0.006c0.078-0.063,0.176-0.099,0.278-0.102h0.003c0.057-0.003,0.114,0.009,0.17,0.03c0.81,0.329,2.743,1.121,3.081,1.336c0.024,0.015,0.042,0.027,0.048,0.036c0.117,0.164-0.03,0.46-0.296,0.475c-0.263,0.018-1.216-0.263-1.808-0.131c-0.592,0.131-0.723,0.182-1.142-0.066C20.972,22.551,20.515,22.123,20.874,21.346z M32.107,31.902c-0.006,0.042-0.009,0.084-0.015,0.126c-0.006,0.042-0.012,0.093-0.021,0.152c-0.006,0.066-0.018,0.131-0.03,0.2c-0.012,0.075-0.027,0.158-0.045,0.248c-0.003,0.03-0.009,0.06-0.018,0.093c-0.006,0.03-0.012,0.063-0.018,0.096c-0.338,1.551-1.165,3.129-2.92,4.303c0,0,0.132-0.526-0.066-0.541c0,0-1.563,0.92-3.389,0.855c-1.826,0.066-3.389-0.855-3.389-0.855c-0.197,0.015-0.066,0.541-0.066,0.541c-1.754-1.174-2.582-2.752-2.92-4.303c-0.006-0.033-0.012-0.066-0.018-0.096c-0.009-0.033-0.015-0.063-0.018-0.093c-0.018-0.09-0.033-0.173-0.045-0.248c-0.012-0.069-0.024-0.134-0.03-0.2c-0.009-0.06-0.015-0.111-0.021-0.152c-0.006-0.042-0.009-0.084-0.015-0.126c-0.26-2.48,0.556-4.659,0.556-4.659l0.768,0.46c0,0,0.353-2.083,2.292-2.699c1.943-0.613,2.905,0,2.905,0s0.962-0.613,2.905,0c1.94,0.616,2.292,2.699,2.292,2.699l0.768-0.46C31.552,27.243,32.367,29.421,32.107,31.902z"/><g id="XMLID_366_"><path id="XMLID_367_" style="&st5;" d="M39.597,20.74c-0.197-0.69-0.756-1.049-0.756-1.049s0.197,1.907,0.164,2.86c-0.033,0.953-1.644,3.287-1.644,3.287c0-0.723-1.216-2.137-1.216-2.137c0,0.732-0.544,2.997-0.795,4.008c-0.051,0.2-0.09,0.35-0.111,0.43c-0.003,0.006-0.003,0.012-0.006,0.015c0.499-2.525-0.867-8.463-0.867-8.463l0.517-0.2l1.183,1.372l-0.185-1.665c0,0,1.381-0.726,0.625-2.797c-0.756-2.071-3.571-1.381-3.571-1.381l-1.363-1.464L32,15.513c-2.005,0.197-3.846,2.498-3.846,2.498c0.293-0.855,0.263-1.479,0.263-1.479c-0.595,0.394-2.83,0.92-2.83,0.92s-2.235-0.526-2.83-0.92c0,0-0.03,0.625,0.263,1.479c0,0-1.841-2.301-3.846-2.498l0.427-1.957l-1.363,1.464c0,0-2.815-0.69-3.571,1.381c-0.756,2.071,0.625,2.797,0.625,2.797l-0.185,1.665l1.183-1.372l0.517,0.2c0,0-1.366,5.938-0.867,8.463c-0.003-0.003-0.003-0.009-0.006-0.015c-0.021-0.081-0.06-0.23-0.111-0.43c-0.251-1.01-0.795-3.275-0.795-4.008c0,0-1.216,1.414-1.216,2.137c0,0-1.611-2.334-1.644-3.287c-0.033-0.953,0.164-2.86,0.164-2.86s-0.559,0.359-0.756,1.049c0,0-1.216-5.884,3.06-7.561c0,0-0.625-0.266-1.802,0.323c0.188-0.194,3.544-3.523,6.93-1.542c0,0-0.066-0.69-0.822-1.183c0,0,1.874,0.263,2.63,1.381c0.756,1.118,1.778,2.238,4.014,2.501c2.235-0.263,3.257-1.384,4.013-2.501c0.756-1.118,2.63-1.381,2.63-1.381c-0.756,0.493-0.822,1.183-0.822,1.183c3.386-1.981,6.742,1.348,6.93,1.542c-1.177-0.589-1.802-0.323-1.802-0.323C40.813,14.855,39.597,20.74,39.597,20.74z"/></g><path id="XMLID_365_" style="&st3;" d="M30.09,26.98c-0.009,0.43-0.882,2.283-1.174,2.89c0,0.003-0.003,0.006-0.003,0.009c-0.045,0.09-0.075,0.152-0.084,0.173c-0.003,0.003-0.003,0.003-0.003,0.003c0.365-0.98-0.093-3.428-0.093-3.428l-0.58,0.559c-0.932-0.263-2.567,0.057-2.567,0.057s-1.635-0.32-2.567-0.057l-0.58-0.559c0,0-0.457,2.448-0.093,3.428c0,0,0,0-0.003-0.003c-0.009-0.021-0.039-0.084-0.084-0.173c0-0.003-0.003-0.006-0.003-0.009c-0.293-0.607-1.166-2.46-1.174-2.89c-0.015-0.514,0.634-1.151,1.644-1.315c1.007-0.167,2.86,0,2.86,0s1.853-0.167,2.86,0C29.457,25.829,30.105,26.466,30.09,26.98z"/><path id="XMLID_364_" style="&st6;" d="M36.596,19.371c-0.335,0.864,0,2.259,0,2.259l-2.229-1.94l0.517-0.2l1.183,1.372l-0.185-1.665c0,0,1.381-0.726,0.625-2.797c-0.756-2.071-3.571-1.381-3.571-1.381l-1.363-1.464L32,15.513c-2.005,0.197-3.846,2.498-3.846,2.498c0.293-0.855,0.263-1.479,0.263-1.479c-0.595,0.394-2.83,0.92-2.83,0.92s-2.235-0.526-2.83-0.92c0,0-0.03,0.625,0.263,1.479c0,0-1.841-2.301-3.846-2.498l0.427-1.957l-1.363,1.464c0,0-2.815-0.69-3.571,1.381c-0.756,2.071,0.625,2.797,0.625,2.797l-0.185,1.665l1.183-1.372l0.517,0.2l-2.229,1.94c0,0,0.335-1.396,0-2.259c-0.335-0.861-1.626-2.412,0.281-4.055c1.904-1.644,3.643-0.897,3.643-0.897l1.42-1.437c0,0-0.299,1.904,0,2.167c0.299,0.26,1.653,0.729,2.277,1.42l-0.167-1.085c0,0,2.143,1.118,3.556,1.497c1.414-0.38,3.556-1.497,3.556-1.497l-0.167,1.085c0.625-0.69,1.978-1.16,2.277-1.42c0.299-0.263,0-2.167,0-2.167l1.42,1.437c0,0,1.739-0.747,3.643,0.897C38.222,16.959,36.931,18.51,36.596,19.371z"/><path id="XMLID_363_" style="&st6;" d="M31.773,26.331l-0.003,0.003c0,0-0.108-4.348-1.59-5.143c-0.003-0.003-0.006-0.006-0.009-0.006c-0.087-0.048-0.179-0.081-0.278-0.102H29.89c0,0-1.327,0.977-3.251,1.366c-0.332,0.066-0.684,0.117-1.052,0.137c-0.368-0.021-0.72-0.072-1.052-0.137c-1.925-0.388-3.251-1.366-3.251-1.366H21.28c-0.099,0.021-0.191,0.054-0.278,0.102c-0.003,0-0.006,0.003-0.009,0.006c-1.482,0.795-1.59,5.143-1.59,5.143l-0.003-0.003c-2.89-4.835,1.351-6.775,2.833-6.377c0.929,0.245,1.56,0.938,1.901,1.417c0.221,0.308,0.577,0.49,0.956,0.49h0.992c0.38,0,0.735-0.182,0.956-0.49c0.341-0.478,0.971-1.171,1.901-1.417C30.422,19.556,34.663,21.496,31.773,26.331z"/><path id="XMLID_362_" style="&st7;" d="M27.986,41.758c0,0,0-0.592-0.377-0.592c0,0-1.121,0.738-2.023,0.738c-0.903,0-2.023-0.738-2.023-0.738c-0.377,0-0.377,0.592-0.377,0.592c-7.734-4.525-5.532-16.368-5.418-16.939c-0.042,0.58-0.882,13.006,5.083,16.215c0,0-0.203-0.598,0.188-0.765c0,0,1.545,0.971,2.546,1.007c1.001-0.036,2.546-1.007,2.546-1.007c0.391,0.167,0.188,0.765,0.188,0.765c5.965-3.21,5.125-15.636,5.083-16.215C33.518,25.39,35.721,37.233,27.986,41.758z"/><linearGradient id="XMLID_3_" gradientUnits="userSpaceOnUse" x1="30.6521" y1="17.5027" x2="34.0593" y2="17.5027"><stop offset="0" style="stop-color:#4DC8ED"/><stop offset="0.9929" style="stop-color:#2B5CAA"/></linearGradient><path id="XMLID_361_" style="&st8;" d="M30.652,17.898c1.503,1.27,2.385,0.765,3.126-0.018c0.58-0.607,0.123-1.267-0.123-1.545l-0.983,0.409c0.278-0.006,0.502,0.131,0.66,0.248c0.155,0.117,0.559,0.741-0.52,1.207c-1.076,0.469-1.24-0.72-1.24-0.72L30.652,17.898z"/><path id="XMLID_360_" style="&st7;" d="M30.518,21.163c0,0,0.831,1.274-0.234,1.926c-1.065,0.652-1.083-0.083-2.185-0.033c-1.102,0.05-1.513,0.228-1.743,0.033c-0.23-0.195-0.243-0.65-0.012-0.827c0.23-0.177,2.746-1.491,3.343-1.422C30.284,20.908,30.518,21.163,30.518,21.163z"/><path id="XMLID_359_" style="&st1;" d="M29.837,22.764c-0.42,0.247-0.552,0.197-1.142,0.066c-0.593-0.132-1.546,0.148-1.809,0.132c-0.263-0.016-0.411-0.313-0.295-0.477c0.091-0.132,2.26-1.018,3.13-1.37c0.224-0.089,0.477,0.014,0.578,0.233C30.659,22.123,30.202,22.55,29.837,22.764z"/><path id="XMLID_358_" style="&st6;" d="M38.338,13.502c-0.188-0.117-3.843-2.358-6.052-1.485c-1.859,0.738-2.205,0.986-2.268,1.049c0.069-0.143,0.547-0.941,0.995-1.408c-0.326,0.185-0.654,0.072-2.436,2.313c-0.586,0.657-1.793,0.894-2.991,0.947c-1.198-0.054-2.406-0.29-2.991-0.947c-1.778-2.241-2.11-2.128-2.436-2.313c0.448,0.466,0.926,1.264,0.995,1.408c-0.063-0.063-0.409-0.311-2.268-1.049c-2.208-0.873-5.863,1.369-6.052,1.485c0.188-0.194,3.544-3.523,6.93-1.542c0,0-0.066-0.69-0.822-1.183c0,0,1.874,0.263,2.63,1.381c0.756,1.118,1.778,2.238,4.014,2.501c2.235-0.263,3.257-1.384,4.013-2.501c0.756-1.118,2.63-1.381,2.63-1.381c-0.756,0.493-0.822,1.183-0.822,1.183C34.794,9.978,38.15,13.307,38.338,13.502z"/><linearGradient id="XMLID_4_" gradientUnits="userSpaceOnUse" x1="30.0036" y1="17.7128" x2="34.9017" y2="17.7128"><stop offset="0" style="stop-color:#4DC8ED"/><stop offset="0.9929" style="stop-color:#2B5CAA"/></linearGradient><path id="XMLID_357_" style="&st9;" d="M30.004,18.194c0.427,1.085,3.165,1.79,4.372,0.427c1.207-1.366-0.042-2.567-0.042-2.567l-0.302,0.126c0.233,0.38,0.616,1.154,0.299,1.727c-0.427,0.765-1.581,2.152-4.232,0.242L30.004,18.194z"/><path id="XMLID_356_" style="&st10;" d="M36.01,23.274c0,0-0.427,3.236-0.66,4.435c0.251-1.01,0.795-3.275,0.795-4.008c0,0,1.216,1.414,1.216,2.137c0,0,1.611-2.334,1.644-3.287c0.033-0.953-0.164-2.86-0.164-2.86s0.559,0.359,0.756,1.049c0,0-0.063-1.228-0.944-1.999c0,0,0.284,5.08-1.085,5.89C37.567,24.631,36.796,23.346,36.01,23.274z"/><path id="XMLID_355_" style="&st11;" d="M35.233,28.154c0,0.003,0,0.003,0,0.006c0-0.006,0.003-0.012,0.006-0.021C35.236,28.145,35.233,28.151,35.233,28.154z"/><path id="XMLID_354_" style="&st12;" d="M32.107,31.902c-0.006,0.042-0.009,0.084-0.015,0.126C32.104,31.946,32.107,31.902,32.107,31.902z"/><path id="XMLID_353_" style="&st10;" d="M31.961,32.816c-0.314,1.545-1.249,4.638-3.828,6.052c0,0,0.619-1.183,0.46-1.431c0,0-1.838,0.732-3.006,0.741c-1.169-0.009-3.006-0.741-3.006-0.741c-0.158,0.248,0.46,1.431,0.46,1.431c-2.579-1.414-3.514-4.507-3.828-6.052c0.338,1.551,1.166,3.129,2.92,4.303c0,0-0.131-0.526,0.066-0.541c0,0,1.563,0.92,3.389,0.855c1.826,0.066,3.389-0.855,3.389-0.855c0.197,0.015,0.066,0.541,0.066,0.541C30.796,35.945,31.623,34.367,31.961,32.816z"/><path id="XMLID_352_" style="&st10;" d="M30.784,27.703c0,0-0.353-2.083-2.292-2.699c-1.942-0.613-2.905,0-2.905,0s-0.962-0.613-2.905,0c-1.939,0.616-2.292,2.699-2.292,2.699s-0.179-2.295,1.1-2.971v0.484c0,0,0.923-0.998,4.097-0.998c3.174,0,4.097,0.998,4.097,0.998v-0.484C30.963,25.408,30.784,27.703,30.784,27.703z"/><linearGradient id="XMLID_5_" gradientUnits="userSpaceOnUse" x1="16.273" y1="17.7128" x2="21.1711" y2="17.7128"><stop offset="0" style="stop-color:#4DC8ED"/><stop offset="0.9929" style="stop-color:#2B5CAA"/></linearGradient><path id="XMLID_351_" style="&st13;" d="M21.171,18.194c-0.427,1.085-3.165,1.79-4.372,0.427c-1.207-1.366,0.042-2.567,0.042-2.567l0.302,0.126l0.377,0.155l0.983,0.409c-0.278-0.006-0.502,0.131-0.66,0.248c-0.155,0.117-0.559,0.741,0.52,1.207c1.076,0.469,1.24-0.72,1.24-0.72l0.92,0.418l0.553,0.251L21.171,18.194z"/><path id="XMLID_350_" style="&st3;" d="M22.727,25.664c-1.009,0.164-1.656,0.801-1.644,1.315c0.011,0.5,1.192,2.923,1.267,3.074c-0.367-0.98,0.093-3.425,0.093-3.425l0.58,0.559c0.932-0.263,2.566,0.055,2.566,0.055v-1.578C25.588,25.664,23.736,25.499,22.727,25.664z"/><path id="XMLID_349_" style="&st4;" d="M21.337,22.764c0.42,0.247,0.55,0.197,1.142,0.066c0.592-0.132,1.546,0.148,1.809,0.132c0.263-0.016,0.411-0.313,0.295-0.477c-0.091-0.132-2.26-1.018-3.13-1.37c-0.224-0.089-0.477,0.014-0.578,0.233C20.515,22.123,20.973,22.55,21.337,22.764z"/><path id="XMLID_348_" style="&st4;" d="M22.684,25.006c-1.941,0.614-2.293,2.697-2.293,2.697l-0.767-0.461c0,0-2.455,6.556,2.51,9.878c0,0-0.132-0.527,0.066-0.543c0,0,1.562,0.92,3.388,0.854V25.006C25.588,25.006,24.627,24.392,22.684,25.006z"/><linearGradient id="XMLID_6_" gradientUnits="userSpaceOnUse" x1="17.1154" y1="17.5027" x2="20.5226" y2="17.5027"><stop offset="0" style="stop-color:#4DC8ED"/><stop offset="0.9929" style="stop-color:#2B5CAA"/></linearGradient><path id="XMLID_347_" style="&st14;" d="M20.523,17.898c-1.503,1.27-2.385,0.765-3.126-0.018c-0.58-0.607-0.122-1.267,0.123-1.545l0.983,0.409c-0.278-0.006-0.502,0.131-0.66,0.248c-0.155,0.117-0.559,0.741,0.52,1.207c1.076,0.469,1.24-0.72,1.24-0.72L20.523,17.898z"/><path id="XMLID_346_" style="&st7;" d="M20.657,21.163c0,0-0.831,1.274,0.234,1.926c1.065,0.652,1.083-0.083,2.185-0.033c1.102,0.05,1.513,0.228,1.743,0.033c0.23-0.195,0.243-0.65,0.012-0.827c-0.23-0.177-2.746-1.491-3.343-1.422C20.891,20.908,20.657,21.163,20.657,21.163z"/><path id="XMLID_345_" style="&st1;" d="M21.337,22.764c0.42,0.247,0.552,0.197,1.142,0.066c0.592-0.132,1.546,0.148,1.809,0.132c0.263-0.016,0.411-0.313,0.295-0.477c-0.091-0.132-2.26-1.018-3.13-1.37c-0.224-0.089-0.477,0.014-0.578,0.233C20.515,22.123,20.973,22.55,21.337,22.764z"/><linearGradient id="XMLID_7_" gradientUnits="userSpaceOnUse" x1="16.273" y1="17.7128" x2="21.1711" y2="17.7128"><stop offset="0" style="stop-color:#4DC8ED"/><stop offset="0.9929" style="stop-color:#2B5CAA"/></linearGradient><path id="XMLID_344_" style="&st15;" d="M21.171,18.194c-0.427,1.085-3.165,1.79-4.372,0.427c-1.207-1.366,0.042-2.567,0.042-2.567l0.302,0.126c-0.233,0.38-0.616,1.154-0.299,1.727c0.427,0.765,1.581,2.152,4.232,0.242L21.171,18.194z"/><g id="XMLID_309_"><path id="XMLID_343_" style="&st7;" d="M16.27,38.745c-1.39-0.947-2.483-3.718-2.483-3.718c-0.096,0.287-0.006,1.635-0.006,1.635c-2.137-1.948-2.032-7.181-2.026-7.343c0,0,0.003,0.021,0.009,0.06c0.493,2.878,1.772,4.779,1.772,4.779c0.003-0.236,0.215-1.031,0.215-1.031C13.852,34.475,16.198,38.617,16.27,38.745z"/><path id="XMLID_314_" style="&st7;" d="M41.062,25.339c-0.006,0.221-0.293,7.355-3.362,9.835c0,0,0.233-1.832,0.126-2.229c0,0-1.718,3.685-3.685,4.859c0.003-0.003,0.006-0.006,0.009-0.012c0.212-0.332,3.637-5.633,3.882-7.432c0,0,0.221,1.1,0.206,1.423C38.238,31.782,40.166,29.263,41.062,25.339z"/><path id="XMLID_313_" style="&st7;" d="M29.584,8.508c0,0-7.597-1.091-11.147,0.547c0.045-0.054,0.762-0.903,1.551-1.279c0,0-3.153,0.275-5.021,0.971c0.17-0.161,3.467-3.105,10.185-2.462c-0.105,0.015-1.802,0.308-3.239,1.079C22.05,7.36,27.058,7.241,29.584,8.508z"/><path id="XMLID_312_" style="&st6;" d="M29.584,8.508c0,0-7.597-1.091-11.147,0.547c0.045-0.054,0.762-0.903,1.551-1.279c0,0-3.153,0.275-5.021,0.971c0.114-0.069,1.993-1.157,5.938-1.363c0,0-0.765,0.487-0.873,0.834C20.032,8.218,24.751,7.193,29.584,8.508z"/><path id="XMLID_311_" style="&st5;" d="M16.27,38.745c-1.39-0.947-2.483-3.718-2.483-3.718c-0.096,0.287-0.006,1.635-0.006,1.635c-2.137-1.948-2.032-7.181-2.026-7.343c0,0,0.003,0.021,0.009,0.06c0.081,0.577,0.765,5.248,1.656,6.509c0,0-0.072-1.073,0.377-1.446C13.796,34.442,14.629,36.725,16.27,38.745z"/><path id="XMLID_310_" style="&st5;" d="M41.062,25.339c-0.006,0.221-0.293,7.355-3.362,9.835c0,0,0.233-1.832,0.126-2.229c0,0-1.718,3.685-3.685,4.859c0.003-0.003,0.006-0.006,0.009-0.012c0.212-0.233,3.015-3.332,3.951-5.69c0,0,0.072,2.125,0,2.451C38.101,34.552,40.677,30.428,41.062,25.339z"/></g><path id="XMLID_308_" style="&st7;" d="M15.164,23.274c0,0,0.427,3.236,0.66,4.435c-0.251-1.01-0.795-3.275-0.795-4.008c0,0-1.216,1.414-1.216,2.137c0,0-1.611-2.334-1.644-3.287c-0.033-0.953,0.164-2.86,0.164-2.86s-0.559,0.359-0.756,1.049c0,0,0.063-1.228,0.944-1.999c0,0-0.284,5.08,1.085,5.89C13.607,24.631,14.378,23.346,15.164,23.274z"/><path id="XMLID_307_" style="&st11;" d="M15.941,28.154c0,0.003,0,0.003,0,0.006c0-0.006-0.003-0.012-0.006-0.021C15.938,28.145,15.941,28.151,15.941,28.154z"/><path id="XMLID_304_" style="&st12;" d="M19.067,31.902c0.006,0.042,0.009,0.084,0.015,0.126C19.07,31.946,19.067,31.902,19.067,31.902z"/><path id="XMLID_303_" style="&st16;" d="M29.107,28.465c-0.006,0.768-0.111,1.192-0.191,1.405c0,0.003-0.003,0.006-0.003,0.009c-0.042,0.108-0.075,0.158-0.084,0.173c-0.003,0.003-0.003,0.003-0.003,0.003c0.365-0.98-0.093-3.428-0.093-3.428l-0.58,0.559c-0.932-0.263-2.567,0.057-2.567,0.057s-1.635-0.32-2.567-0.057l-0.58-0.559c0,0-0.457,2.448-0.093,3.428c0,0,0,0-0.003-0.003c-0.009-0.015-0.042-0.066-0.084-0.173c0-0.003-0.003-0.006-0.003-0.009c-0.081-0.212-0.185-0.637-0.191-1.405c-0.012-1.246,0.284-2.223,0.281-2.241c0.018,0,0.669,0.684,0.909,0.696c0.242,0.012,0.834-0.123,1.219-0.123l0.102-0.436l0.242,0.49c0,0,0.368-0.051,0.768,0.018c0.4-0.069,0.768-0.018,0.768-0.018l0.242-0.49l0.102,0.436c0.386,0,0.977,0.134,1.219,0.123c0.239-0.012,0.891-0.696,0.908-0.696C28.823,26.241,29.119,27.219,29.107,28.465z"/><path id="XMLID_301_" style="&st3;" d="M30.497,34.992c-0.625,1.019-4.363,1.503-4.91,1.503c-0.547,0-4.285-0.484-4.91-1.503c-0.628-1.019,0.559-3.419,0.559-3.419c0.239,1.644,1.019,3.234,1.019,3.234l0.371-0.657c0.858,0.329,2.962,0.35,2.962,0.35s2.104-0.021,2.962-0.35l0.371,0.657c0,0,0.78-1.59,1.019-3.234C29.938,31.573,31.124,33.973,30.497,34.992z"/><path id="XMLID_299_" style="&st16;" d="M29.938,31.573c0,0-0.278,2.908-1.037,3.622l-0.472-0.714c0,0-0.598,0.167-0.935,0.23l-0.117,0.433l-0.137-0.409c0,0-0.911,0.111-1.653,0.081c-0.741,0.03-1.653-0.081-1.653-0.081l-0.137,0.409l-0.117-0.433c-0.338-0.063-0.935-0.23-0.935-0.23l-0.472,0.714c-0.759-0.714-1.037-3.622-1.037-3.622c0.239,1.644,1.019,3.234,1.019,3.234l0.371-0.657c0.858,0.329,2.962,0.35,2.962,0.35s2.104-0.021,2.962-0.35l0.371,0.657C28.919,34.806,29.699,33.217,29.938,31.573z"/><path id="XMLID_298_" style="&st1;" d="M21.14,3.473c0,0,4.445-0.391,6.863-1.138c0,0-0.797,1.015-0.268,1.376c0.529,0.361-1.438,0.897-1.438,0.897L21.14,3.473z"/><path id="XMLID_292_" style="&st1;" d="M32.06,4.202c0,0,3.688,0.841,4.958,1.7c0,0-0.782-0.108-0.566,0.369c0.217,0.477,0.092,1.038,0.092,1.038l-2.528-0.598L32.06,4.202z"/></g><path id="XMLID_287_" style="&st1;" d="M15.744,16.737c0.08,0.013,3.272-0.16,5.623,2.498l0.16-1.522l-1.723-1.043l-2.41-0.721l-0.768-0.227L15.744,16.737z"/><path id="XMLID_286_" style="&st1;" d="M29.915,18.46c0,0,3.226-2.086,4.888-2.125l-0.521-0.613l-0.748,0.267l-1.589,0.882l-1.883,0.788l-0.24,0.401L29.915,18.46z"/></g></g></svg>';
var mySVG64 = window.btoa(svg);
return mySVG64;
}
function TRASH( color ){
var svg = 
'<?xml version="1.0" encoding="iso-8859-1"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Capa_220" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="482.428px" height="482.429px" viewBox="0 0 482.428 482.429" style="enable-background:new 0 0 482.428 482.429;" xml:space="preserve"><g><g><path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979V115.744z"/><path d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"/><path d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"/><path d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>';
return svg;
}


function RESET( color ){
var svg = 
'<?xml version="1.0" encoding="iso-8859-1"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Capa_110" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="438.529px" height="438.528px" viewBox="0 0 438.529 438.528" style="enable-background:new 0 0 438.529 438.528;" xml:space="preserve"><g><g><path d="M433.109,23.694c-3.614-3.612-7.898-5.424-12.848-5.424c-4.948,0-9.226,1.812-12.847,5.424l-37.113,36.835c-20.365-19.226-43.684-34.123-69.948-44.684C274.091,5.283,247.056,0.003,219.266,0.003c-52.344,0-98.022,15.843-137.042,47.536C43.203,79.228,17.509,120.574,5.137,171.587v1.997c0,2.474,0.903,4.617,2.712,6.423c1.809,1.809,3.949,2.712,6.423,2.712h56.814c4.189,0,7.042-2.19,8.566-6.565c7.993-19.032,13.035-30.166,15.131-33.403c13.322-21.698,31.023-38.734,53.103-51.106c22.082-12.371,45.873-18.559,71.376-18.559c38.261,0,71.473,13.039,99.645,39.115l-39.406,39.397c-3.607,3.617-5.421,7.902-5.421,12.851c0,4.948,1.813,9.231,5.421,12.847c3.621,3.617,7.905,5.424,12.854,5.424h127.906c4.949,0,9.233-1.807,12.848-5.424c3.613-3.616,5.42-7.898,5.42-12.847V36.542C438.529,31.593,436.733,27.312,433.109,23.694z"/><path d="M422.253,255.813h-54.816c-4.188,0-7.043,2.187-8.562,6.566c-7.99,19.034-13.038,30.163-15.129,33.4c-13.326,21.693-31.028,38.735-53.102,51.106c-22.083,12.375-45.874,18.556-71.378,18.556c-18.461,0-36.259-3.423-53.387-10.273c-17.13-6.858-32.454-16.567-45.966-29.13l39.115-39.112c3.615-3.613,5.424-7.901,5.424-12.847c0-4.948-1.809-9.236-5.424-12.847c-3.617-3.62-7.898-5.431-12.847-5.431H18.274c-4.952,0-9.235,1.811-12.851,5.431C1.807,264.844,0,269.132,0,274.08v127.907c0,4.945,1.807,9.232,5.424,12.847c3.619,3.61,7.902,5.428,12.851,5.428c4.948,0,9.229-1.817,12.847-5.428l36.829-36.833c20.367,19.41,43.542,34.355,69.523,44.823c25.981,10.472,52.866,15.701,80.653,15.701c52.155,0,97.643-15.845,136.471-47.534c38.828-31.688,64.333-73.042,76.52-124.05c0.191-0.38,0.281-1.047,0.281-1.995c0-2.478-0.907-4.612-2.715-6.427C426.874,256.72,424.731,255.813,422.253,255.813z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>';
return svg;
}
function TEST1( color ){
var svg = 
'<?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 502 502" style="enable-background:new 0 0 502 502;" xml:space="preserve"><g><g><g><path d="M492,56.375H10c-5.522,0-10,4.477-10,10v369.25c0,5.523,4.478,10,10,10h482c5.522,0,10-4.477,10-10V66.375C502,60.852,497.522,56.375,492,56.375z M120.5,425.625H20v-53.896h100.5V425.625z M120.5,351.728H20v-53.896h100.5V351.728z M120.5,277.832H20v-53.896h100.5V277.832z M120.5,203.935H20v-53.664h100.5V203.935z M241,425.625H140.5v-53.896H241V425.625z M241,351.728H140.5v-53.896H241V351.728z M241,277.832H140.5v-53.896H241V277.832z M241,203.935H140.5v-53.664H241V203.935z M361.5,425.625H261v-53.896h100.5V425.625z M361.5,351.728H261v-53.896h100.5V351.728z M361.5,277.832H261v-53.896h100.5V277.832z M361.5,203.935H261v-53.664h100.5V203.935z M482,425.625H381.5v-53.896H482V425.625z M482,351.728H381.5v-53.896H482V351.728z M482,277.832H381.5v-53.896H482V277.832z M482,203.936H381.5v-53.664H482V203.936z M482,130.039H20V76.375h462V130.039z"/><path d="M209,107.625h192c5.522,0,10-4.477,10-10s-4.478-10-10-10H209c-5.522,0-10,4.477-10,10S203.478,107.625,209,107.625z"/><path d="M436,107.625h22c5.522,0,10-4.477,10-10s-4.478-10-10-10h-22c-5.522,0-10,4.477-10,10S430.478,107.625,436,107.625z"/></g></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>';
return svg;
}

function TEST3( color ){
var svg = 
'<?xml version="1.0" encoding="iso-8859-1"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Capa_100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="31.666px" height="31.666px" viewBox="0 0 31.666 31.666" style="enable-background:new 0 0 31.666 31.666;" xml:space="preserve"><g><g><path d="M28.118,10.573c-0.014,0.035-0.03,0.067-0.046,0.103c0.019-0.031,0.038-0.061,0.056-0.091C28.125,10.581,28.12,10.577,28.118,10.573z"/><path d="M15.081,29.559c-0.546,0.709-1.404,1.115-2.356,1.115c-0.765,0-1.533-0.266-2.164-0.75l-7.827-6.018c-0.169-0.131-0.323-0.274-0.465-0.428c0.233,0.785,0.702,1.494,1.379,2.014l6.951,5.342c0.699,0.537,1.554,0.832,2.407,0.832c1.101,0,2.1-0.479,2.74-1.312l13.382-17.417c0.543-0.705,0.689-1.721,0.696-2.567L15.081,29.559z"/><path d="M2.904,23.686l7.828,6.019c0.582,0.446,1.289,0.692,1.993,0.692c0.865,0,1.644-0.366,2.136-1.008L29.814,9.926c-0.003-0.074-0.006-0.15-0.012-0.219c-0.07-0.912-0.47-2.623-1.652-3.533l-6.951-5.342C20.501,0.296,19.646,0,18.793,0c-0.972,0-1.658,0.35-2.112,0.697L2.143,19.617c-0.006,0.007-0.009,0.016-0.015,0.023c-0.262,0.606-0.381,1.33-0.196,2.207c0.11,0.604,0.14,0.764,0.177,0.973C2.318,23.146,2.583,23.439,2.904,23.686z M16.292,2.5c0.641-0.834,1.64-1.313,2.739-1.313c0.854,0,1.708,0.296,2.405,0.832l5.777,4.21c1.183,0.909,1.503,1.596,1.572,2.508c0.028,0.527-0.125,0.99-0.292,1.327l0.007,0.005l-0.036,0.057c-0.072,0.139-0.142,0.244-0.201,0.326l-0.428,0.685l-0.079,0.104c0.125-0.174,0.229-0.361,0.314-0.563c-0.029,0.055-0.058,0.109-0.098,0.161l-0.221,0.407L22.73,17.8l-0.721-0.552l-0.014,0.018l-9.075-6.973l-1.564-1.194L16.292,2.5z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>';
return svg;
}


// NextSVG

//function TESTN( color ){


function TESTP3( color ){
var svg = 
'<?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" id="Capa_18" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 111.577 111.577" style="enable-background:new 0 0 111.577 111.577;" xml:space="preserve"><g><path d="M78.962,99.536l-1.559,6.373c-4.677,1.846-8.413,3.251-11.195,4.217c-2.785,0.969-6.021,1.451-9.708,1.451c-5.662,0-10.066-1.387-13.207-4.142c-3.141-2.766-4.712-6.271-4.712-10.523c0-1.646,0.114-3.339,0.351-5.064c0.239-1.727,0.619-3.672,1.139-5.846l5.845-20.688c0.52-1.981,0.962-3.858,1.316-5.633c0.359-1.764,0.532-3.387,0.532-4.848c0-2.642-0.547-4.49-1.636-5.529c-1.089-1.036-3.167-1.562-6.252-1.562c-1.511,0-3.064,0.242-4.647,0.71c-1.59,0.47-2.949,0.924-4.09,1.346l1.563-6.378c3.829-1.559,7.489-2.894,10.99-4.002c3.501-1.111,6.809-1.667,9.938-1.667c5.623,0,9.962,1.359,13.009,4.077c3.047,2.72,4.57,6.246,4.57,10.591c0,0.899-0.1,2.483-0.315,4.747c-0.21,2.269-0.601,4.348-1.171,6.239l-5.82,20.605c-0.477,1.655-0.906,3.547-1.279,5.676c-0.385,2.115-0.569,3.731-0.569,4.815c0,2.736,0.61,4.604,1.833,5.597c1.232,0.993,3.354,1.487,6.368,1.487c1.415,0,3.025-0.251,4.814-0.744C76.854,100.348,78.155,99.915,78.962,99.536z M80.438,13.03c0,3.59-1.353,6.656-4.072,9.177c-2.712,2.53-5.98,3.796-9.803,3.796c-3.835,0-7.111-1.266-9.854-3.796c-2.738-2.522-4.11-5.587-4.11-9.177c0-3.583,1.372-6.654,4.11-9.207C59.447,1.274,62.729,0,66.563,0c3.822,0,7.091,1.277,9.803,3.823C79.087,6.376,80.438,9.448,80.438,13.03z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>';
return svg;
}


function TEXTFILE( color ){
var svg = 
'<?xml version="1.0" encoding="iso-8859-1"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Capa_144" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 290.479 290.479" style="enable-background:new 0 0 290.479 290.479;" xml:space="preserve"><g><path d="M282.479,35.636H8c-4.418,0-8,3.582-8,8v203.207c0,4.418,3.582,8,8,8h274.479c4.418,0,8-3.582,8-8V43.636C290.479,39.218,286.897,35.636,282.479,35.636z M264.418,53.225c4.942,0,8.95,4.008,8.95,8.951c0,4.943-4.008,8.951-8.95,8.951c-4.944,0-8.952-4.008-8.952-8.951C255.466,57.233,259.474,53.225,264.418,53.225z M238.967,53.225c4.944,0,8.951,4.008,8.951,8.951c0,4.943-4.007,8.951-8.951,8.951c-4.943,0-8.951-4.008-8.951-8.951C230.016,57.233,234.023,53.225,238.967,53.225z M213.516,53.225c4.943,0,8.951,4.008,8.951,8.951c0,4.943-4.008,8.951-8.951,8.951c-4.943,0-8.951-4.008-8.951-8.951C204.565,57.233,208.573,53.225,213.516,53.225z M274.479,238.843H16V89.427h258.479V238.843z"/><path d="M43.358,156.159h139.038c4.419,0,8-3.582,8-8c0-4.418-3.581-8-8-8H43.358c-4.418,0-8,3.582-8,8C35.358,152.577,38.94,156.159,43.358,156.159z"/><path d="M43.358,124.473H247.12c4.418,0,8-3.582,8-8c0-4.418-3.582-8-8-8H43.358c-4.418,0-8,3.582-8,8C35.358,120.892,38.94,124.473,43.358,124.473z"/><path d="M43.358,187.844h139.038h37.156c4.418,0,8-3.581,8-8c0-4.418-3.582-8-8-8h-37.156H43.358c-4.418,0-8,3.582-8,8C35.358,184.263,38.94,187.844,43.358,187.844z"/><path d="M43.358,219.53h116.264c4.419,0,8-3.582,8-8c0-4.419-3.581-8-8-8H43.358c-4.418,0-8,3.581-8,8C35.358,215.948,38.94,219.53,43.358,219.53z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>';
return svg;
}





function TESTP2( color ){
var svg = 
'<?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 297 297" style="enable-background:new 0 0 297 297;" xml:space="preserve"><g><g><g><path d="M146.556,0c-31.527,0-61.649,9.762-87.107,28.231c-2.917,2.116-3.709,6.121-1.819,9.189l23.911,38.79c1.006,1.631,2.646,2.77,4.526,3.141c1.878,0.372,3.829-0.057,5.38-1.181c14.882-10.796,32.492-16.502,50.926-16.502c47.879,0,86.831,38.952,86.831,86.831c0,47.879-38.952,86.831-86.831,86.831c-18.435,0-36.045-5.706-50.926-16.502c-1.551-1.126-3.502-1.552-5.38-1.181c-1.88,0.371-3.52,1.511-4.526,3.141L57.63,259.58c-1.89,3.068-1.098,7.073,1.819,9.189C84.907,287.238,115.029,297,146.556,297c81.883,0,148.5-66.617,148.5-148.5S228.44,0,146.556,0z"/><path d="M107.99,197.125c-1.409,2.113-1.541,4.83-0.341,7.07c1.198,2.239,3.531,3.637,6.071,3.637h46.618c2.302,0,4.453-1.151,5.73-3.067l34.963-52.445c1.543-2.314,1.543-5.326,0-7.64l-34.963-52.445c-1.277-1.916-3.428-3.067-5.73-3.067H113.72c-2.54,0-4.873,1.398-6.071,3.637c-1.199,2.24-1.068,4.957,0.341,7.07l16.171,24.257H26.312c-13.437,0-24.368,10.931-24.368,24.368s10.931,24.368,24.368,24.368h97.849L107.99,197.125z"/></g></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>';
return svg;
}


function TESTP( color ){
var svg = 
'<?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" id="Capa_101" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 44 44" style="enable-background:new 0 0 44 44;" xml:space="preserve"><path d="M22,44c-3.309,0-6-2.665-6-5.941V28H5.941C2.665,28,0,25.309,0,22s2.665-6,5.941-6H16V5.941C16,2.665,18.691,0,22,0s6,2.665,6,5.941V16h10.059C41.335,16,44,18.691,44,22s-2.665,6-5.941,6H28v10.059C28,41.335,25.309,44,22,44z M5.941,18C3.805,18,2,19.832,2,22s1.805,4,3.941,4H18v12.059C18,40.195,19.832,42,22,42s4-1.805,4-3.941V26h12.059C40.195,26,42,24.168,42,22s-1.805-4-3.941-4H26V5.941C26,3.805,24.168,2,22,2s-4,1.805-4,3.941V18H5.941z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>';
return svg;
}

function TESTM( color ){
var svg = 
'<?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" id="Capa_102" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 44 44" style="enable-background:new 0 0 44 44;" xml:space="preserve"><path d="M38.059,28H5.941C2.665,28,0,25.309,0,22s2.665-6,5.941-6h32.117C41.335,16,44,18.691,44,22S41.335,28,38.059,28z M5.941,18C3.805,18,2,19.832,2,22s1.805,4,3.941,4h32.117C40.195,26,42,24.168,42,22s-1.805-4-3.941-4H5.941z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>';
return svg;
}


function TEST2( color ){
var svg = 
'<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m76 240c12.101562 0 23.054688-4.855469 31.148438-12.652344l44.402343 22.199219c-.222656 1.808594-.550781 3.585937-.550781 5.453125 0 24.8125 20.1875 45 45 45s45-20.1875 45-45c0-6.925781-1.703125-13.410156-4.511719-19.277344l60.234375-60.234375c5.867188 2.808594 12.351563 4.511719 19.277344 4.511719 24.8125 0 45-20.1875 45-45 0-4.671875-.917969-9.089844-2.246094-13.328125l52.335938-39.242187c7.140625 4.769531 15.699218 7.570312 24.910156 7.570312 24.8125 0 45-20.1875 45-45s-20.1875-45-45-45-45 20.1875-45 45c0 4.671875.917969 9.089844 2.246094 13.328125l-52.335938 39.242187c-7.140625-4.769531-15.699218-7.570312-24.910156-7.570312-24.8125 0-45 20.1875-45 45 0 6.925781 1.703125 13.410156 4.511719 19.277344l-60.234375 60.234375c-5.867188-2.808594-12.351563-4.511719-19.277344-4.511719-12.101562 0-23.054688 4.855469-31.148438 12.652344l-44.402343-22.199219c.222656-1.808594.550781-3.585937.550781-5.453125 0-24.8125-20.1875-45-45-45s-45 20.1875-45 45 20.1875 45 45 45zm0 0"/><path d="m497 482h-16v-317c0-8.289062-6.710938-15-15-15h-60c-8.289062 0-15 6.710938-15 15v317h-30v-227c0-8.289062-6.710938-15-15-15h-60c-8.289062 0-15 6.710938-15 15v227h-30v-107c0-8.289062-6.710938-15-15-15h-60c-8.289062 0-15 6.710938-15 15v107h-30v-167c0-8.289062-6.710938-15-15-15h-60c-8.289062 0-15 6.710938-15 15v167h-16c-8.289062 0-15 6.710938-15 15s6.710938 15 15 15h482c8.289062 0 15-6.710938 15-15s-6.710938-15-15-15zm0 0"/></svg>';
return svg;
}



function ZoomOut( color ){
var svg = 
'<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="475.084px" height="475.084px" viewBox="0 0 475.084 475.084" enable-background="new 0 0 475.084 475.084" xml:space="preserve"><g><g><path d="M464.524,412.846l-97.929-97.925c23.6-34.068,35.406-72.04,35.406-113.917c0-27.218-5.284-53.249-15.852-78.087c-10.561-24.842-24.838-46.254-42.825-64.241s-39.396-32.264-64.233-42.826C254.246,5.285,228.217,0.003,200.999,0.003c-27.216,0-53.247,5.282-78.085,15.847C98.072,26.412,76.66,40.689,58.673,58.676c-17.989,17.987-32.264,39.403-42.827,64.241C5.282,147.758,0,173.786,0,201.004c0,27.216,5.282,53.238,15.846,78.083c10.562,24.838,24.838,46.247,42.827,64.241c17.987,17.986,39.403,32.257,64.241,42.825c24.841,10.563,50.869,15.844,78.085,15.844c41.879,0,79.852-11.807,113.922-35.405l97.929,97.641c6.852,7.231,15.406,10.849,25.693,10.849c10.089,0,18.699-3.566,25.838-10.705c7.139-7.138,10.704-15.748,10.704-25.837C475.085,428.451,471.567,419.889,464.524,412.846z M291.363,291.358c-25.029,25.033-55.148,37.549-90.364,37.549c-35.21,0-65.329-12.519-90.36-37.549c-25.031-25.029-37.546-55.144-37.546-90.36c0-35.21,12.518-65.334,37.546-90.36c25.026-25.032,55.15-37.546,90.36-37.546c35.212,0,65.331,12.519,90.364,37.546c25.033,25.026,37.548,55.15,37.548,90.36C328.911,236.214,316.392,266.329,291.363,291.358z"/><path d="M283.228,182.728h-164.45c-2.474,0-4.615,0.905-6.423,2.712c-1.809,1.809-2.712,3.949-2.712,6.424v18.271c0,2.475,0.903,4.617,2.712,6.424c1.809,1.809,3.946,2.713,6.423,2.713h164.454c2.478,0,4.612-0.905,6.427-2.713c1.804-1.807,2.703-3.949,2.703-6.424v-18.271c0-2.475-0.903-4.615-2.707-6.424C287.851,183.633,285.706,182.728,283.228,182.728z"/></g></g></svg>';
return svg;
}

function ZoomIn( color ){
var svg = 
'<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="475.084px" height="475.084px" viewBox="0 0 475.084 475.084" enable-background="new 0 0 475.084 475.084" xml:space="preserve"><g><g><path d="M464.524,412.846l-97.929-97.925c23.6-34.068,35.406-72.04,35.406-113.917c0-27.218-5.284-53.249-15.852-78.087c-10.561-24.842-24.838-46.254-42.825-64.241s-39.396-32.264-64.233-42.826C254.246,5.285,228.217,0.003,200.999,0.003c-27.216,0-53.247,5.282-78.085,15.847C98.072,26.412,76.66,40.689,58.673,58.676c-17.989,17.987-32.264,39.403-42.827,64.241C5.282,147.758,0,173.786,0,201.004c0,27.216,5.282,53.238,15.846,78.083c10.562,24.838,24.838,46.247,42.827,64.241c17.987,17.986,39.403,32.257,64.241,42.825c24.841,10.563,50.869,15.844,78.085,15.844c41.879,0,79.852-11.807,113.922-35.405l97.929,97.641c6.852,7.231,15.406,10.849,25.693,10.849c10.089,0,18.699-3.566,25.838-10.705c7.139-7.138,10.704-15.748,10.704-25.837C475.085,428.451,471.567,419.889,464.524,412.846z M291.363,291.358c-25.029,25.033-55.148,37.549-90.364,37.549c-35.21,0-65.329-12.519-90.36-37.549c-25.031-25.029-37.546-55.144-37.546-90.36c0-35.21,12.518-65.334,37.546-90.36c25.026-25.032,55.15-37.546,90.36-37.546c35.212,0,65.331,12.519,90.364,37.546c25.033,25.026,37.548,55.15,37.548,90.36C328.911,236.214,316.392,266.329,291.363,291.358z"/><path d="M283.232,182.728h-63.954v-63.953c0-2.475-0.905-4.615-2.712-6.424c-1.809-1.809-3.951-2.712-6.423-2.712H191.87c-2.474,0-4.615,0.903-6.423,2.712c-1.807,1.809-2.712,3.949-2.712,6.424v63.953h-63.954c-2.474,0-4.615,0.905-6.423,2.712c-1.809,1.809-2.712,3.949-2.712,6.424v18.271c0,2.475,0.903,4.617,2.712,6.424c1.809,1.809,3.946,2.713,6.423,2.713h63.954v63.954c0,2.478,0.905,4.616,2.712,6.427c1.809,1.804,3.949,2.707,6.423,2.707h18.272c2.473,0,4.615-0.903,6.423-2.707c1.807-1.811,2.712-3.949,2.712-6.427v-63.954h63.954c2.478,0,4.612-0.905,6.427-2.713c1.804-1.807,2.703-3.949,2.703-6.424v-18.271c0-2.475-0.899-4.615-2.703-6.424C287.851,183.633,285.709,182.728,283.232,182.728z"/></g></g></svg>';
return svg;
}

function LeftArrow( color ){
var svg = 
'<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="46.02px" height="46.02px" viewBox="0 0 46.02 46.02" enable-background="new 0 0 46.02 46.02" xml:space="preserve"><g><g><path fill="'+( color )+'" d="M31.263,0c1.412,0,2.825,0.521,3.929,1.569c2.282,2.17,2.373,5.78,0.204,8.063L22.638,23.05l12.745,13.325c2.177,2.275,2.097,5.885-0.179,8.063c-2.277,2.178-5.886,2.097-8.063-0.179L10.636,27.006c-2.104-2.2-2.108-5.665-0.013-7.872L27.127,1.773C28.25,0.596,29.753,0,31.263,0z"/></g></g></svg>';
return svg;
}

function RightArrow( color ){
var svg = 
'<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="46.02px" height="46.02px" viewBox="0 0 46.02 46.02" enable-background="new 0 0 46.02 46.02" xml:space="preserve"><g><g><path fill="'+( color )+'" d="M14.757,46.02c-1.412,0-2.825-0.521-3.929-1.569c-2.282-2.17-2.373-5.78-0.204-8.063L23.382,22.97L10.637,9.645C8.46,7.37,8.54,3.76,10.816,1.582c2.277-2.178,5.886-2.097,8.063,0.179l16.505,17.253c2.104,2.2,2.108,5.665,0.013,7.872L18.893,44.247C17.77,45.424,16.267,46.02,14.757,46.02z"/></g></g></svg>';
return svg;
}


function PointUp(){
var svg = 
'<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="444.819px" height="444.819px" viewBox="0 0 444.819 444.819" enable-background="new 0 0 444.819 444.819" xml:space="preserve"><g><path d="M10.566,259.098l21.409,21.413c7.419,7.042,16.084,10.564,25.975,10.564c10.095,0,18.657-3.521,25.7-10.564l83.938-83.939v200.992c0,9.9,3.621,18.464,10.855,25.697c7.234,7.232,15.797,10.85,25.693,10.85l36.545,0c9.897,0,18.464-3.621,25.693-10.85c7.236-7.233,10.85-15.797,10.85-25.697V196.572l83.939,83.939c7.042,7.042,15.606,10.564,25.697,10.564c9.896,0,18.559-3.521,25.979-10.564l21.128-21.413c7.236-7.227,10.851-15.894,10.851-25.979c0-10.282-3.619-18.848-10.848-25.698L248.106,21.275c-7.045-7.046-15.609-10.567-25.697-10.567c-9.897,0-18.558,3.521-25.977,10.567L10.567,207.421C3.524,214.464,0,223.029,0,233.119C-0.001,243.014,3.523,251.674,10.566,259.098z"/></g></svg>';
return svg;
}

function PointDown(){
var svg = 
'<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="444.819px" height="444.819px" viewBox="0 0 444.819 444.819" enable-background="new 0 0 444.819 444.819" xml:space="preserve"><g><path d="M434.252,185.721l-21.409-21.413c-7.419-7.042-16.084-10.564-25.975-10.564c-10.095,0-18.657,3.521-25.7,10.564l-83.938,83.939V47.255c0-9.9-3.621-18.464-10.855-25.697c-7.234-7.232-15.797-10.85-25.693-10.85h-36.545c-9.897,0-18.464,3.621-25.693,10.85c-7.236,7.233-10.85,15.797-10.85,25.697v200.992l-83.939-83.939c-7.042-7.042-15.606-10.564-25.697-10.564c-9.896,0-18.559,3.521-25.979,10.564l-21.128,21.413C3.615,192.948,0,201.615,0,211.7c0,10.282,3.619,18.848,10.848,25.698l185.864,186.146c7.045,7.046,15.609,10.567,25.697,10.567c9.897,0,18.558-3.521,25.977-10.567l185.865-186.146c7.043-7.043,10.567-15.608,10.567-25.698C444.819,201.805,441.295,193.145,434.252,185.721z"/></g></svg>';
return svg;
}

function PointRight(){
var svg = 
'<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="444.819px" height="444.819px" viewBox="0 0 444.819 444.819" enable-background="new 0 0 444.819 444.819" xml:space="preserve"><g><path d="M185.721,10.566l-21.413,21.409c-7.042,7.419-10.564,16.084-10.564,25.975c0,10.095,3.521,18.657,10.564,25.7l83.939,83.938H47.255c-9.9,0-18.464,3.621-25.697,10.855c-7.232,7.234-10.85,15.797-10.85,25.693v36.545c0,9.897,3.621,18.464,10.85,25.693c7.233,7.236,15.797,10.85,25.697,10.85h200.992l-83.939,83.939c-7.042,7.042-10.564,15.606-10.564,25.697c0,9.896,3.521,18.559,10.564,25.979l21.413,21.128c7.227,7.236,15.894,10.851,25.979,10.851c10.282,0,18.848-3.619,25.698-10.848l186.146-185.864c7.046-7.045,10.567-15.609,10.567-25.697c0-9.897-3.521-18.558-10.567-25.977L237.398,10.567C230.355,3.524,221.79,0,211.7,0C201.805-0.001,193.145,3.523,185.721,10.566z"/></g></svg>';
return svg;
}


function PointLeft(){
var svg = 
'<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="444.819px" height="444.819px" viewBox="0 0 444.819 444.819" enable-background="new 0 0 444.819 444.819" xml:space="preserve"><g><path d="M233.118,0c-10.09,0-18.655,3.524-25.698,10.567L21.275,196.432c-7.046,7.419-10.567,16.08-10.567,25.977c0,10.088,3.521,18.652,10.567,25.697L207.421,433.97c6.85,7.229,15.416,10.848,25.698,10.848c10.085,0,18.752-3.615,25.979-10.851l21.413-21.128c7.043-7.42,10.564-16.083,10.564-25.979c0-10.091-3.522-18.655-10.564-25.697l-83.939-83.939h200.992c9.9,0,18.464-3.614,25.697-10.85c7.229-7.229,10.85-15.796,10.85-25.693v-36.545c0-9.896-3.618-18.459-10.85-25.693c-7.233-7.234-15.797-10.855-25.697-10.855H196.572L280.51,83.65c7.043-7.043,10.564-15.605,10.564-25.7c0-9.891-3.522-18.556-10.564-25.975l-21.413-21.409C251.674,3.523,243.014-0.001,233.118,0z"/></g></svg>';
return svg;
}


function AlignM0(){
var svg = 
'<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd" [<!ENTITY st0 "">]><svg version="1.0" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" fill="#E0E0E0" width="512px" height="512px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path style="&st0;" d="M237.72,493.134V40.361c0-5.11-1.813-9.528-5.433-13.264c-3.615-3.731-7.904-5.597-12.854-5.597h-36.573c-4.956,0-9.238,1.866-12.856,5.597c-3.62,3.734-5.428,8.153-5.428,13.264v452.773c0,5.113,1.808,9.533,5.428,13.268c3.618,3.731,7.904,5.599,12.856,5.599h36.573c4.951,0,9.24-1.868,12.854-5.6C235.907,502.663,237.72,498.243,237.72,493.134z"/><path style="&st0;" d="M128.002,502.857V338.29c0-2.476-1.81-4.621-5.428-6.432c-3.62-1.808-7.904-2.714-12.856-2.714H73.144c-4.952,0-9.236,0.906-12.859,2.714c-3.615,1.81-5.428,3.955-5.428,6.432v164.567c0,2.478,1.813,4.62,5.428,6.43c3.62,1.808,7.908,2.713,12.859,2.713h36.573c4.952,0,9.236-0.905,12.856-2.714C126.191,507.476,128.002,505.333,128.002,502.857z"/><path style="&st0;" d="M389.428,331.084c-3.62,1.293-5.431,2.825-5.431,4.593V505.47c0,1.77,1.811,3.3,5.431,4.593c3.618,1.292,7.905,1.938,12.856,1.938h36.572c4.952,0,9.239-0.647,12.863-1.939c3.613-1.294,5.425-2.825,5.425-4.593V335.676c0-1.767-1.812-3.299-5.425-4.593c-3.624-1.292-7.911-1.939-12.863-1.939h-36.572C397.333,329.145,393.046,329.792,389.428,331.084z"/><path style="&st0;" d="M347.43,496.676V190.204c0-4.149-1.812-7.743-5.432-10.774c-3.617-3.033-7.904-4.552-12.856-4.552h-36.568c-4.949,0-9.24,1.519-12.856,4.552c-3.62,3.03-5.432,6.623-5.432,10.774v306.472c0,4.153,1.812,7.743,5.432,10.777c3.617,3.031,7.908,4.548,12.856,4.548h36.571c4.952,0,9.243-1.517,12.856-4.549C345.621,504.417,347.43,500.826,347.43,496.676z"/></svg>';
//var mySVG64 = window.btoa(svg);
return svg;
}

function AlignM1(){
var svg = 
'<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd" [<!ENTITY st0 "">]><svg version="1.0" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" fill="#51D8FC" width="512px" height="512px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path style="&st0;" d="M237.72,493.134V40.361c0-5.11-1.813-9.528-5.433-13.264c-3.615-3.731-7.904-5.597-12.854-5.597h-36.573c-4.956,0-9.238,1.866-12.856,5.597c-3.62,3.734-5.428,8.153-5.428,13.264v452.773c0,5.113,1.808,9.533,5.428,13.268c3.618,3.731,7.904,5.599,12.856,5.599h36.573c4.951,0,9.24-1.868,12.854-5.6C235.907,502.663,237.72,498.243,237.72,493.134z"/><path style="&st0;" d="M128.002,502.857V338.29c0-2.476-1.81-4.621-5.428-6.432c-3.62-1.808-7.904-2.714-12.856-2.714H73.144c-4.952,0-9.236,0.906-12.859,2.714c-3.615,1.81-5.428,3.955-5.428,6.432v164.567c0,2.478,1.813,4.62,5.428,6.43c3.62,1.808,7.908,2.713,12.859,2.713h36.573c4.952,0,9.236-0.905,12.856-2.714C126.191,507.476,128.002,505.333,128.002,502.857z"/><path style="&st0;" d="M389.428,331.084c-3.62,1.293-5.431,2.825-5.431,4.593V505.47c0,1.77,1.811,3.3,5.431,4.593c3.618,1.292,7.905,1.938,12.856,1.938h36.572c4.952,0,9.239-0.647,12.863-1.939c3.613-1.294,5.425-2.825,5.425-4.593V335.676c0-1.767-1.812-3.299-5.425-4.593c-3.624-1.292-7.911-1.939-12.863-1.939h-36.572C397.333,329.145,393.046,329.792,389.428,331.084z"/><path style="&st0;" d="M347.43,496.676V190.204c0-4.149-1.812-7.743-5.432-10.774c-3.617-3.033-7.904-4.552-12.856-4.552h-36.568c-4.949,0-9.24,1.519-12.856,4.552c-3.62,3.03-5.432,6.623-5.432,10.774v306.472c0,4.153,1.812,7.743,5.432,10.777c3.617,3.031,7.908,4.548,12.856,4.548h36.571c4.952,0,9.243-1.517,12.856-4.549C345.621,504.417,347.43,500.826,347.43,496.676z"/></svg>';
//var mySVG64 = window.btoa(svg);
return svg;
}


function AlignL0(){
var svg = 
'<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd" [<!ENTITY st0 "">]><svg version="1.0" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" fill="#E0E0E0" width="512px" height="512px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path style="&st0;" d="M237.72,497.473v-324.64c0-3.664-1.813-6.832-5.433-9.51c-3.615-2.675-7.904-4.013-12.854-4.013h-36.573c-4.956,0-9.238,1.338-12.856,4.013c-3.62,2.678-5.428,5.846-5.428,9.51v324.64c0,3.666,1.808,6.835,5.428,9.513c3.618,2.675,7.904,4.014,12.856,4.014h36.573c4.951,0,9.24-1.339,12.854-4.015C235.906,504.306,237.72,501.136,237.72,497.473z"/><path style="&st0;" d="M128.002,486.524V45.982c0-6.628-1.81-12.371-5.428-17.217c-3.62-4.839-7.904-7.265-12.856-7.265H73.144c-4.952,0-9.236,2.426-12.859,7.265c-3.615,4.845-5.428,10.588-5.428,17.217v440.541c0,6.633,1.813,12.367,5.428,17.213c3.62,4.841,7.908,7.264,12.859,7.264h36.573c4.952,0,9.236-2.423,12.856-7.265C126.191,498.887,128.002,493.151,128.002,486.524z"/><path style="&st0;" d="M389.428,402.327c-3.62,0.776-5.431,1.697-5.431,2.759v101.992c0,1.063,1.811,1.982,5.431,2.759c3.618,0.776,7.905,1.164,12.856,1.164h36.572c4.952,0,9.239-0.388,12.863-1.164c3.613-0.777,5.425-1.697,5.425-2.759V405.085c0-1.061-1.812-1.982-5.425-2.759c-3.624-0.776-7.911-1.165-12.863-1.165h-36.572C397.333,401.162,393.046,401.551,389.428,402.327z"/><path style="&st0;" d="M347.43,501.015V301.309c0-2.704-1.812-5.046-5.432-7.02c-3.617-1.977-7.904-2.966-12.856-2.966h-36.568c-4.949,0-9.24,0.99-12.856,2.966c-3.62,1.974-5.432,4.316-5.432,7.02v199.705c0,2.706,1.812,5.046,5.432,7.023c3.617,1.975,7.908,2.964,12.856,2.964h36.571c4.952,0,9.243-0.989,12.856-2.964C345.621,506.059,347.43,503.719,347.43,501.015z"/></svg>';
//var mySVG64 = window.btoa(svg);
return svg;
}

function AlignL1(){
var svg = 
'<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd" [<!ENTITY st0 "">]><svg version="1.0" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" fill="#51D8FC" width="512px" height="512px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path style="&st0;" d="M237.72,497.473v-324.64c0-3.664-1.813-6.832-5.433-9.51c-3.615-2.675-7.904-4.013-12.854-4.013h-36.573c-4.956,0-9.238,1.338-12.856,4.013c-3.62,2.678-5.428,5.846-5.428,9.51v324.64c0,3.666,1.808,6.835,5.428,9.513c3.618,2.675,7.904,4.014,12.856,4.014h36.573c4.951,0,9.24-1.339,12.854-4.015C235.906,504.306,237.72,501.136,237.72,497.473z"/><path style="&st0;" d="M128.002,486.524V45.982c0-6.628-1.81-12.371-5.428-17.217c-3.62-4.839-7.904-7.265-12.856-7.265H73.144c-4.952,0-9.236,2.426-12.859,7.265c-3.615,4.845-5.428,10.588-5.428,17.217v440.541c0,6.633,1.813,12.367,5.428,17.213c3.62,4.841,7.908,7.264,12.859,7.264h36.573c4.952,0,9.236-2.423,12.856-7.265C126.191,498.887,128.002,493.151,128.002,486.524z"/><path style="&st0;" d="M389.428,402.327c-3.62,0.776-5.431,1.697-5.431,2.759v101.992c0,1.063,1.811,1.982,5.431,2.759c3.618,0.776,7.905,1.164,12.856,1.164h36.572c4.952,0,9.239-0.388,12.863-1.164c3.613-0.777,5.425-1.697,5.425-2.759V405.085c0-1.061-1.812-1.982-5.425-2.759c-3.624-0.776-7.911-1.165-12.863-1.165h-36.572C397.333,401.162,393.046,401.551,389.428,402.327z"/><path style="&st0;" d="M347.43,501.015V301.309c0-2.704-1.812-5.046-5.432-7.02c-3.617-1.977-7.904-2.966-12.856-2.966h-36.568c-4.949,0-9.24,0.99-12.856,2.966c-3.62,1.974-5.432,4.316-5.432,7.02v199.705c0,2.706,1.812,5.046,5.432,7.023c3.617,1.975,7.908,2.964,12.856,2.964h36.571c4.952,0,9.243-0.989,12.856-2.964C345.621,506.059,347.43,503.719,347.43,501.015z"/></svg>';
//var mySVG64 = window.btoa(svg);
return svg;
}


function AlignR0(){
var svg = 
'<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd" [<!ENTITY st0 "">]><svg version="1.0" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" fill="#E0E0E0" width="512px" height="512px" viewBox="0 0 512 512" style="opacity:0.9; enable-background:new 0 0 512 512;" xml:space="preserve"><path style="&st0;" d="M279.715,495.986c3.615,2.676,7.904,4.015,12.854,4.015h36.573c4.953,0,9.239-1.339,12.856-4.014c3.62-2.678,5.428-5.847,5.428-9.513v-324.64c0-3.664-1.808-6.833-5.428-9.51c-3.619-2.675-7.901-4.013-12.856-4.013h-36.573c-4.951,0-9.24,1.338-12.854,4.013c-3.62,2.678-5.433,5.847-5.433,9.51v324.64C274.282,490.136,276.095,493.306,279.715,495.986z"/><path style="&st0;" d="M389.428,492.736c3.621,4.842,7.905,7.265,12.856,7.265h36.573c4.952,0,9.24-2.423,12.859-7.264c3.615-4.846,5.428-10.58,5.428-17.213V34.982c0-6.629-1.813-12.373-5.428-17.217c-3.624-4.839-7.908-7.265-12.859-7.265h-36.573c-4.953,0-9.237,2.426-12.856,7.265C385.81,22.611,384,28.355,384,34.982v440.541C384,482.151,385.81,487.887,389.428,492.736z"/><path style="&st0;" d="M109.718,390.162H73.145c-4.953,0-9.24,0.389-12.863,1.165c-3.613,0.777-5.425,1.697-5.425,2.759v101.992c0,1.062,1.812,1.982,5.425,2.759c3.625,0.776,7.912,1.164,12.863,1.164h36.572c4.952,0,9.239-0.388,12.856-1.164c3.62-0.777,5.431-1.696,5.431-2.759V394.085c0-1.062-1.811-1.982-5.431-2.759C118.956,390.551,114.669,390.162,109.718,390.162z"/><path style="&st0;" d="M170.001,497.037c3.614,1.975,7.905,2.964,12.856,2.964h36.571c4.949,0,9.24-0.989,12.856-2.964c3.62-1.977,5.432-4.317,5.432-7.023V290.309c0-2.704-1.812-5.046-5.432-7.02c-3.617-1.977-7.908-2.966-12.856-2.966H182.86c-4.953,0-9.24,0.99-12.856,2.966c-3.62,1.975-5.432,4.317-5.432,7.02v199.705C164.572,492.719,166.381,495.059,170.001,497.037z"/></svg>';
return svg;
}

function AlignR1(){
var svg = 
'<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd" [<!ENTITY st0 "">]><svg version="1.0" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" fill="#51D8FC" width="512px" height="512px" viewBox="0 0 512 512" style="opacity:0.9; enable-background:new 0 0 512 512;" xml:space="preserve"><path style="&st0;" d="M279.715,495.986c3.615,2.676,7.904,4.015,12.854,4.015h36.573c4.953,0,9.239-1.339,12.856-4.014c3.62-2.678,5.428-5.847,5.428-9.513v-324.64c0-3.664-1.808-6.833-5.428-9.51c-3.619-2.675-7.901-4.013-12.856-4.013h-36.573c-4.951,0-9.24,1.338-12.854,4.013c-3.62,2.678-5.433,5.847-5.433,9.51v324.64C274.282,490.136,276.095,493.306,279.715,495.986z"/><path style="&st0;" d="M389.428,492.736c3.621,4.842,7.905,7.265,12.856,7.265h36.573c4.952,0,9.24-2.423,12.859-7.264c3.615-4.846,5.428-10.58,5.428-17.213V34.982c0-6.629-1.813-12.373-5.428-17.217c-3.624-4.839-7.908-7.265-12.859-7.265h-36.573c-4.953,0-9.237,2.426-12.856,7.265C385.81,22.611,384,28.355,384,34.982v440.541C384,482.151,385.81,487.887,389.428,492.736z"/><path style="&st0;" d="M109.718,390.162H73.145c-4.953,0-9.24,0.389-12.863,1.165c-3.613,0.777-5.425,1.697-5.425,2.759v101.992c0,1.062,1.812,1.982,5.425,2.759c3.625,0.776,7.912,1.164,12.863,1.164h36.572c4.952,0,9.239-0.388,12.856-1.164c3.62-0.777,5.431-1.696,5.431-2.759V394.085c0-1.062-1.811-1.982-5.431-2.759C118.956,390.551,114.669,390.162,109.718,390.162z"/><path style="&st0;" d="M170.001,497.037c3.614,1.975,7.905,2.964,12.856,2.964h36.571c4.949,0,9.24-0.989,12.856-2.964c3.62-1.977,5.432-4.317,5.432-7.023V290.309c0-2.704-1.812-5.046-5.432-7.02c-3.617-1.977-7.908-2.966-12.856-2.966H182.86c-4.953,0-9.24,0.99-12.856,2.966c-3.62,1.975-5.432,4.317-5.432,7.02v199.705C164.572,492.719,166.381,495.059,170.001,497.037z"/></svg>';
return svg;
}

function CollapseH(){
var svg = '<?xml version="1.0" encoding="utf-8"?> <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="444.819px" height="444.819px" viewBox="0 0 444.819 444.819" enable-background="new 0 0 444.819 444.819" xml:space="preserve"> <g> <path d="M358.991,110.575c-4.359,0-8.059,1.756-11.102,5.266l-80.415,92.623c-3.044,3.697-4.565,8.013-4.565,12.945 c0,5.027,1.521,9.295,4.565,12.806l80.415,92.623c2.959,3.602,6.66,5.406,11.102,5.406c4.357,0,8.101-1.801,11.223-5.407 l9.25-10.529c3.043-3.698,4.564-8.015,4.564-12.946c0-5.029-1.522-9.296-4.564-12.806l-36.262-41.83h86.828 c4.277,0,7.976-1.801,11.101-5.407c3.123-3.602,4.687-7.872,4.687-12.804v-18.212c0-4.932-1.563-9.199-4.687-12.804 c-3.125-3.605-6.824-5.409-11.101-5.409h-86.828l36.262-41.829c3.043-3.51,4.564-7.777,4.564-12.807 c0-4.929-1.521-9.247-4.564-12.944l-9.25-10.669C367.006,112.331,363.265,110.574,358.991,110.575z"/> </g> <circle cx="219.437" cy="222.381" r="31.411"/> <g> <path d="M85.455,334.244c4.24,0,7.839-1.756,10.798-5.266l78.217-92.623c2.961-3.697,4.44-8.013,4.44-12.945 c0-5.027-1.479-9.295-4.44-12.806l-78.217-92.623c-2.878-3.602-6.478-5.406-10.798-5.406c-4.238,0-7.879,1.801-10.916,5.407 l-8.998,10.529c-2.959,3.698-4.439,8.015-4.439,12.946c0,5.029,1.48,9.296,4.439,12.806l35.27,41.83H16.357 c-4.16,0-7.758,1.801-10.798,5.407C2.521,205.103,1,209.372,1,214.304v18.212c0,4.932,1.52,9.199,4.559,12.804 c3.039,3.605,6.638,5.409,10.798,5.409h84.455l-35.27,41.829c-2.959,3.51-4.439,7.777-4.439,12.807 c0,4.929,1.48,9.247,4.439,12.944l8.998,10.669C77.658,332.488,81.297,334.245,85.455,334.244z"/> </g> </svg>';  
return svg;
}
function CollapseV(){
var svg = '<?xml version="1.0" encoding="utf-8"?> <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="444.819px" height="444.819px" viewBox="0 0 444.819 444.819" enable-background="new 0 0 444.819 444.819" xml:space="preserve"> <g> <path d="M111.575,86.828c0,4.359,1.756,8.059,5.266,11.102l92.623,80.415c3.697,3.044,8.013,4.565,12.945,4.565 c5.027,0,9.295-1.521,12.806-4.565l92.623-80.415c3.602-2.959,5.406-6.66,5.406-11.102c0-4.357-1.801-8.101-5.407-11.223 l-10.529-9.25c-3.698-3.043-8.015-4.564-12.946-4.564c-5.029,0-9.296,1.521-12.806,4.564l-41.83,36.262V15.788 c0-4.277-1.801-7.976-5.407-11.101C240.716,1.564,236.447,0,231.515,0l-18.212,0c-4.932,0-9.199,1.563-12.804,4.687 c-3.605,3.125-5.409,6.824-5.409,11.101v86.828l-41.829-36.262c-3.51-3.043-7.777-4.564-12.807-4.564 c-4.929,0-9.247,1.521-12.944,4.564l-10.669,9.25C113.331,78.812,111.574,82.554,111.575,86.828z"/> </g> <circle cx="223.382" cy="226.382" r="31.411"/> <g> <path d="M335.244,360.364c0-4.24-1.756-7.839-5.266-10.798l-92.623-78.217c-3.697-2.961-8.013-4.44-12.945-4.44 c-5.027,0-9.295,1.479-12.806,4.44l-92.623,78.217c-3.602,2.878-5.406,6.478-5.406,10.798c0,4.238,1.801,7.879,5.407,10.916 l10.529,8.997c3.698,2.959,8.015,4.439,12.946,4.439c5.029,0,9.296-1.48,12.806-4.439l41.83-35.27v84.455 c0,4.16,1.801,7.758,5.407,10.798c3.602,3.038,7.872,4.559,12.804,4.559h18.212c4.932,0,9.199-1.52,12.804-4.559 c3.605-3.039,5.409-6.638,5.409-10.798v-84.455l41.829,35.27c3.51,2.959,7.777,4.439,12.807,4.439c4.929,0,9.247-1.48,12.944-4.439 l10.669-8.998C333.488,368.161,335.245,364.522,335.244,360.364z"/> </g> </svg>';  
return svg;
}

function btn( pr ){
        
        var p = (pr === undefined ? B : pr )
        var el = newRel("50px", "50px");
        UT.setBG( el, "black" );
        UT.setDsp( el, "inline-block" );
        //UT.setBor( el, "1px solid white" );
        p.appendChild( el ); 
        return el;
}



function ParallelColocatedLine( CNTNR ){
    
    
    var idx = "dimensionCPC";
    var W = 100;
    var H = 200;
    var Y = 50;
    var Z = 5;
    var S = 0;
   
    
    //var len = DATA.data.length;
    var els = [];
    var Er = 2;
    var local_count = 0;
    


    var X1 = X + M;
    var Y1 = Y;
    var W1, H1, Y1B;
    
   
    
    var PLCords = PLCoordinates();
    var CPCords = CPCoordinates();
    
    
    
        
    var svg2id = "CPC"+UT.count();
        build = "";
        build += SVG.openSVG( svg2id, "100%", "100%");
        CPC( CPCords );
        build += SVG.closeSVG();
    var svg2 = UT.HTMLToDiv( build, svg2id ); 
        //svg2.style.opacity = 1;    
        CNTNR.appendChild( svg2 ); 
        //CURRENT_IMGS.push( svg2 );
        
        svg2.style.overflow = "visible";
        svg2.style.position = "absolute";
        svg2.style.display = "none";
        //svg2.style.left = "100px";
        
        
        
        
    var X = 10;
    var M = 50;
    var X1 = X + M;
    var svg1id = "PLC"+UT.count();   
    function PLC( cords ){
        for( var i = 0 ; i < cords.length; i++ ){
            build += SVG.Rect( cords[i].w, cords[i].h, cords[i].x1, cords[i].y1, 0, 0, "black", "dimensionLine"+UT.count()  );
        }
    }   
    var build = "";
        build += SVG.openSVG( svg1id, "100%", "100%");
        PLC( PLCords );
        build += SVG.closeSVG();
    var svg1 = UT.HTMLToDiv( build, svg1id ); 
        //svg1.style.opacity = 1;    
        svg1.style.position = "absolute";
        svg1.style.display = "none";
        svg1.style.left = 0;
        svg1.style.overflow = "visible";
    
        CNTNR.appendChild( svg1 ); 
    
        //CURRENT_IMGS.push( svg1 );
        //CURRENT_IMGS.push( svg2 );
        
    
  
    
    
    
    
 
 
  
  
  
      function CPC( cords ){
        X1 = M;
        if(cords===undefined) cords = CPCoordinates();
        for( var i = 0; i < cords.length; i++ ){
            build += SVG.Rect( cords[i].w, cords[i].h, cords[i].x1, cords[i].y1, 0, 0, "black", "dimensionLine"+UT.count() );
        }
    }   
    //
    //PLC( PLCords );
  

    
 
        
        
        
    var toIntro = function(){
      
        

        var el;
        var Xs = PLCoordinates();
        for(var i = 0 ; i < getData().length; i++){
            el    = newAbs("20px", "20px");
            el.id = idx + i;
            UT.setBG( el, "black" );
            UT.setL( el, -S+"px" );
            UT.setT( el, "200px" );
            els.push( el ); 
            CNTNR.appendChild( el ); 
        }
        
        
        var tl = anime.timeline({});
        
        var dur = ( getData().length >= 10 ) ? 0 : 300;
        return tl;
}   
        
        
        
        
        
        
       
    var toPLC = function(){
      
      var tl = anime.timeline({});
      
        var even_names = [];
        var odd_names = [];
        for(var i = 0 ; i < getData().length; i++){
              if( i % 2 === 0 ){
                 odd_names.push( ('#')+(idx)+(i));
                 continue;
              }
              even_names.push( ('#')+(idx)+(i));
        }
        ////console.log("even_names: "+even_names);
        /*
        tl.add({
              targets: even_names,
              keyframes: [
              //{ opacity: "1.0" },
               { left: '+='+((( W + M )))},
               //{ opacity: "0.0" },
              ],
              duration: 600,
              easing: 'easeOutElastic(2, 2)',
              loop: false
        });
        tl.add({
              targets: odd_names,
              keyframes: [
               //{ opacity: "1.0" },
               { rotate: '0deg', top: '-='+(H/2), left: '-='+((H/2)-Er)},
               //{ opacity: "0.0" },
              ],
              duration: 600,
              easing: 'easeOutElastic(2, 2)',
              loop: false
          });
          */
          return tl;
      
      
    }
    var toCLC = function( timeline ){
        
        
        var even_names = [];
        var odd_names = [];
        for(var i = 0 ; i < getData().length; i++){
              if( i % 2 === 0 ){
                 odd_names.push( ('#')+(idx)+(i));
                 continue;
              }
              even_names.push( ('#')+(idx)+(i));
        }
        
        
        ////console.log("even_names: "+even_names);
        /*
        tl.add({
              targets: even_names,
              keyframes: [
                //{ opacity: "1.0" },
               { left: '-='+(((W + M)))},
               //{ opacity: "0.0" },
              ],
              duration: 600,
              easing: 'easeOutElastic(2, 2)',
              loop: false
        });
        tl.add({
              targets: odd_names,
              keyframes: [
                //{ opacity: "1.0" },
               { rotate: '90deg', top: '+='+(H/2), left: '+='+((H/2)-Er)},
               //{ opacity: "0.0" },
              ],
              duration: 600,
              easing: 'easeOutElastic(2, 2)',
              loop: false
          });
          */
          return tl;
        
    }
    
    
    //here
    var Ob = {};
        Ob.ids = {};
        Ob.bgs = [ svg1, svg2 ];
        Ob.setBG = function( index ){
          if( Ob.bgs === undefined ) return;
          if( index >= Ob.bgs.length ) return;
          if( index === -1 ){
              // if input is -1 turn all off
              for( var i = 0 ; i < Ob.bgs.length; i++ ){
                  Ob.bgs[i].style.display = "none";
              }
              return;
          }
          for( var i = 0 ; i < Ob.bgs.length; i++ ){
              Ob.bgs[i].style.display = "none";
          }
          Ob.bgs[index].style.display = "";
        }
        Ob.getBG = function( index ){
            if( Ob.bgs === undefined ) return;
            if( index >= Ob.bgs.length ) return;
            if( index < 0 ) return;
            return  Ob.bgs[ index ];
        }
        Ob.play = function(){
            for( var i = 0 ; i < els.length; i++ ){
                els[i].style.display = "";
            }
        }
        Ob.stop = function(){
            for( var i = 0 ; i < els.length; i++ ){
                els[i].style.display = "none";
            }
        }
        Ob.toLinesPLCFast = function( data , targets, order, skip, drawtime ){
            if(skip     ===undefined || skip < 1 ) skip = 1; else skip++;
            if(order    ===undefined ) order = UT.seq(0, data.length );
            if(drawtime ===undefined ) drawtime = 0;

            var PLCords = PLCoordinates();
            var baseValues = UT.rep( 0 , (data.length * 2) - 1 ); 
            var svgid = "LinePLC"+UT.count();
            var colorids = [ GRADIENT_INDICES++, GRADIENT_INDICES++, GRADIENT_INDICES++, GRADIENT_INDICES++, GRADIENT_INDICES++ ];
            var build = "";
                build += SVG.openSVG( svgid, "100%", "100%")
                      + SVG.openDefinition()
                          + SVG.templates.GradBlueLight0( colorids[0] )
                          + SVG.templates.GradBlueLight1( colorids[1] )
                          + SVG.templates.GradBlueLight2( colorids[2] )
                          + SVG.templates.GradBlueLight3( colorids[3] )
                          + SVG.templates.GradBlueLight4( colorids[4] )
                    + SVG.closeDefinition();
     
     
     
                var slower = function(){
                var x, y1, y2, w, h, v,c, id, offset = 0, x0, y0;
                var names = [];
                var values, classes, style, color;
                var same_value_fix = false;
                
                
                build += getSVGStringPLC(PLCords); 
                for( var j = 0; j < targets.length; j+=skip ){
                    values = [];
                    classes = [];
                    w      = 8;
                    //x0     = PLCords[0].x1 + ER;
                    //y0     = (data[ order[0] ][0] * (PLCords[ order[0] ].y2 + (ER*2))-(PLCords[ order[0] ].y1 + ER)) + (PLCords[ order[0] ].y1 + ER);
                    id = svgid + "_"+j;
                    for(var i  = 0, index ; i < order.length; i++ ){
                        index  = order[i];
                        x      = PLCords[i].x1 + ER; // x value derived from i, to prevent overlap
                        y1     = PLCords[index].y1 + ER;
                        y2     = PLCords[index].y2 + (ER*2);
                        h      = y2-y1;
                        v = (data[index][j] * h) + y1;
                        c = targets[j];
                        same_value_fix = i === order.length-1;
                        if( same_value_fix ){
                          // FIX - if all y values are the same, it will not be a poly line thus will not show
                          //       to fix this, just change the final value to += 1 on the y access. 
                          v += 1;
                        }
                        values.push( x );
                        values.push( v-(w/2) );
                        classes.push( c ); 
                    }
                    //names.push( "#"+id ); 
                    c = classes[classes.length-1];
                    color = "url(#Gradient"+(colorids[c])+")"
                    style = 'fill: none; stroke:'+( color )+'; stroke-width:'+( LINEW )+';';
                    baseValues = values;
                    build += SVG.Polyline( baseValues , style , id );
                }
                build += SVG.closeSVG();
            var svg = UT.HTMLToDiv( build, svgid ); 
                svg.style.position = "absolute";
                svg.style.display = "";
                Ob.ids.lines = names;
              
              
              
              var divv = UT.newAbs("100%", "100%");
              UT.setBG( divv,"transparent");
              divv.appendChild( svg ); 
              CURRENT_IMGS.push( divv );
              CNTNR.appendChild( divv ); 
              
              
              //CURRENT_IMGS.push( svg );
               loadingScreenOff();
              }
              loadingScreenOn();
                UT.callback([slower],[100]);
               
              
              
              function toLineAnimation( value, name ){
                  var progression = [];
                  var build;
                  for(var i = 0 ; i < value.length; i+=2 ){
                      build = "";
                      for(var j = 0 ; j < value.length; j+=2 ){
                          index1 = j < i ? j : i;
                          index2 = j+1 < i+1 ? j +1: i+1;
                          build += j !== 0 ? " " : "";
                          build += value[index1] + " " + value[index2];
                          //build.push(  ); 
                          //build.push( ); 
                      }
                      progression.push( build ); 
                  }
                  
                  if( progression.length < 2 ) return;
                  var points = [];
                  
                  points.push({value: [
                      progression[0],
                      progression[1],
                  ]});
                  
                  for(var i = 2; i < progression.length; i++ ){
                      points.push({ value: progression[i]});
                  }
                  ////console.log( points ); 
                  
                  return points;
              }
        }
        Ob.toPointsCLCBFast = function( data , trgt ){
          
          ////alert("! " + Ob.ids.evens ); 
     
            
            
            
            
            var offset  = 0; 
            var atts    = getData().length;
            var uneven  = atts % 2 !== 0;
            var CPCAtts = Math.floor( atts / 2 ) + ( uneven ? 1 : 0 );
            var cases   =  getData()[0].length;
            //var lineobjs= Ob.ids.lines;
            var newLineObjs = [];
            var svgid = "LineCLC"+UT.count();
            var colorids = [ GRADIENT_INDICES++, GRADIENT_INDICES++, GRADIENT_INDICES++, GRADIENT_INDICES++, GRADIENT_INDICES++ ];
            var build = "";
                build += SVG.openSVG( svgid, "100%", "100%")
                      + SVG.openDefinition()
                          + SVG.templates.GradBlueLight0( colorids[0] )
                          + SVG.templates.GradBlueLight1( colorids[1] )
                          + SVG.templates.GradBlueLight2( colorids[2] )
                          + SVG.templates.GradBlueLight3( colorids[3] )
                          + SVG.templates.GradBlueLight4( colorids[4] )
                    + SVG.closeDefinition();
                
         
            
                var slower = function(){
                function grad( index ){
                  if( index >= colorids.length ) return colorids[0];
                  else return colorids[index];
                }
                //document.getElementById( Ob.ids.evens[0].id ).parentNode.style.display = "none";  
              
                var data = getData();
                var targ = getTargets();
                var CPCords = CPCoordinates();
                var attributes_n = getData().length;
                var cases_n = getTargets().length;
                var w      = 8;
                var r      = 8;
                var c      = 1;
                var H      = 200;
                var k;
                var a, b;
                
                
                var values, classes, color, style;
                var newLineObjs = [];
                build += getSVGStringCLC( CPCords );
                for( var i  = 0 ; i < data[0].length; i++ ){
                    values = [], classes = [];
                    for( var j = 0 ; j <  data.length; j+=2 ){
                        
                        a = j;
                        b = (j + 1 >= data.length ) ? j : j + 1;
                        ////console.log( "?" + data[j][i] + ": " + a + " " + b ); 
                        id     = svgid + "_"+i+"_"+j+"and"+(j+1);
                        x1     = CPCords[a].x1;
                        
                        y1     = CPCords[a].y1;
                        x2     = CPCords[b].x2;
                        y2     = CPCords[b].y2;
                        c      = targ[i];
                        x      = x1 + ( H * data[a][i] );
                        y      = ( a !== b ) ? y1 - ( H * data[b][i] ) : y1; 
                        
                        build += SVG.RectGradient(w,w,x,y,"Gradient"+ colorids[c] , r, r, id , "");
                          
                   
                        
                        
                    }  
           
                    
                    //newLineObjs.push({ id: id, points: values, c: c });
                    
                }
              
              
              
            build += SVG.closeSVG();
            var svg = UT.HTMLToDiv( build, svgid ); 
                svg.style.position = "absolute";
                svg.style.display = "";
                svg.style.overflow = "visible";
                
                
                
              var divv = UT.newAbs("100%", "100%");
              UT.setBG( divv,"transparent");
              divv.appendChild( svg ); 
              CURRENT_IMGS.push( divv );
              CNTNR.appendChild( divv ); 
              svg.style.top = (-offset)+"px";
              loadingScreenOff();
            
            }
            loadingScreenOn();
            UT.callback([ slower ],[100]);
            
        }
        Ob.toLinesCLCBFast = function(){
        
        
            var offset  = 0; 
            var atts    = getData().length;
            var uneven  = atts % 2 !== 0;
            var CPCAtts = Math.floor( atts / 2 ) + ( uneven ? 1 : 0 );
            var cases   =  getData()[0].length;
            //var lineobjs= Ob.ids.lines;
            var newLineObjs = [];
            var svgid = "LineCLC"+UT.count();
            var colorids = [ GRADIENT_INDICES++, GRADIENT_INDICES++, GRADIENT_INDICES++, GRADIENT_INDICES++, GRADIENT_INDICES++ ];
            var build = "";
                build += SVG.openSVG( svgid, "100%", "100%")
                      + SVG.openDefinition()
                          + SVG.templates.GradBlueLight0( colorids[0] )
                          + SVG.templates.GradBlueLight1( colorids[1] )
                          + SVG.templates.GradBlueLight2( colorids[2] )
                          + SVG.templates.GradBlueLight3( colorids[3] )
                          + SVG.templates.GradBlueLight4( colorids[4] )
                    + SVG.closeDefinition();
                
            
            
                var slower = function(){
                function grad( index ){
                  if( index >= colorids.length ) return colorids[0];
                  else return colorids[index];
                }
                //document.getElementById( Ob.ids.evens[0].id ).parentNode.style.display = "none";  
              
                var data = getData();
                var targ = getTargets();
                var CPCords = CPCoordinates();
                var attributes_n = getData().length;
                var cases_n = getTargets().length;
                var w      = 8;
                var r      = 8;
                var c      = 1;
                var H      = 200;
                var k;
                var a, b;
                
                
                var values, classes, color, style;
                var newLineObjs = [];
                
                var svgcodeAndObject = getSVGStringCLCObject( CPCords );
                build += svgcodeAndObject[0];
                var grids = svgcodeAndObject[1];
                
                for( var i  = 0 ; i < data[0].length; i++ ){
                    values = [], classes = [];
                    for( var j = 0 ; j <  data.length; j+=2 ){
                        
                        a = j;
                        b = (j + 1 >= data.length ) ? j : j + 1;
                        ////console.log( "?" + data[j][i] + ": " + a + " " + b ); 
                        id     = svgid + "_"+i+"_"+j+"and"+(j+1);
                        x1     = CPCords[a].x1;
                        
                        y1     = CPCords[a].y1;
                        x2     = CPCords[b].x2;
                        y2     = CPCords[b].y2;
                        c      = targ[i];
                        x      = x1 + ( H * data[a][i] );
                        y      = ( a !== b ) ? y1 - ( H * data[b][i] ) : y1; 
                        values.push( x ); 
                        values.push( y ); 
                        classes.push( c );
                        
                        
                    }  
                    color = "url(#Gradient"+(colorids[c])+")"
                    style = 'fill: none; stroke:'+( color )+'; stroke-width:'+( LINEW )+';';
                    id = svgid + "_"+i;
                    build += SVG.Polyline( values , style , id );
                    
                    newLineObjs.push({ id: id, points: values, c: c });
                    
                }
              
              
              
            build += SVG.closeSVG();
            var svg = UT.HTMLToDiv( build, svgid ); 
                svg.style.position = "absolute";
                svg.style.display = "";
                svg.style.overflow = "visible";
                
                
                
              var divv = UT.newAbs("100%", "100%");
              UT.setBG( divv,"transparent");
              divv.appendChild( svg ); 
              CURRENT_IMGS.push( divv );
              
            
             CNTNR.appendChild( divv ); 
                  //CURRENT_IMGS.push( svg );
            svg.style.top = (-offset)+"px";
              
              
            Ob.ids.lines = newLineObjs;
            Ob.ids.gradients = colorids;
            Ob.ids.grids = grids;

            loadingScreenOff();
            
            }
            loadingScreenOn();
            UT.callback([ slower ],[100]);
              
              
              
              
        }
        Ob.fadeOut = function( idsGroups, dur, post_delay ){
            var tl = anime.timeline({});
            /*
            for( var i = 0 ; i < idsGroups.length; i++ ){
                tl.add({
                    targets: idsGroups[i],
                    keyframes: [
                        { opacity:  0 },
                    ],
                    duration: dur,
                    easing: 'easeOutElastic(2, 2)',
                    loop: false
                });
            }
            if( post_delay !== undefined ){
                 tl.add({
                    targets: idsGroups[0][0],
                    keyframes: [
                        { opacity:  0 },
                    ],
                    duration: post_delay,
                    easing: 'easeOutElastic(2, 2)',
                    loop: false
                });
              
            }
            */
            return tl;
        }
        Ob.toPointsCLCAFast = function( data , targets, order, skip  ){
            if(skip === undefined || skip < 1 ) skip = 1; else skip++;
            if(order=== undefined) order = UT.seq(0, data.length );
            var w      = 8;
            var r      = w;
            var svgid = "PointCLC"+UT.count();
            var colorids = [ GRADIENT_INDICES++, GRADIENT_INDICES++, GRADIENT_INDICES++, GRADIENT_INDICES++, GRADIENT_INDICES++ ];
            var build = "";
                build += SVG.openSVG( svgid, "100%", "100%")
                      + SVG.openDefinition()
                          + SVG.templates.GradBlueLight0( colorids[0] )
                          + SVG.templates.GradBlueLight1( colorids[1] )
                          + SVG.templates.GradBlueLight2( colorids[2] )
                          + SVG.templates.GradBlueLight3( colorids[3] )
                          + SVG.templates.GradBlueLight4( colorids[4] )
                    + SVG.closeDefinition();
                //function grad( index ){
                //  if( index >= colorids.length ) return colorids[0];
                //  else return colorids[index];
                //}
                var CPCords = CPCoordinates();
                loadingScreenOn();
                var slower = function(){
                var x, y, x1, x2, y1, y2, hx, hy, v,c, id, isOdd;
                var namesOdd = [], namesEven = [], obEven = [], obOdd = [];
                
                build += getSVGStringCLC( CPCords );
                for(var i  = 0, index ; i < order.length; i++ ){
                    index  = order[i];
                    x1     = CPCords[i].x1;
                    y2     = CPCords[index].y2;
                    for( var j = 0; j < targets.length; j+=skip ){
                        id = svgid + "_"+i+"_"+j;
                        c = targets[j];
                        isOdd = i % 2 !== 0;
                        if( isOdd ){
                            ////console.log("adding to(O)" + index +","+ j ); 
                           ////console.log("adding to(0)" + data[index][j]  ); 
                            v = ( -( data[index][j] * CPCords[1].h ) + CPCords[0].y1) - (w);
                            x = x1;
                            y = v;
                            build += SVG.RectGradient(w,w,x,y,"Gradient"+ colorids[c] , r, r, id , "");
                            //namesOdd.push( "#"+id );
                            //obOdd.push({ x: x, y : y, c: c, id: id });
                        } else {
                            ////console.log("adding to(1)" + data[index][j]  ); 
                            v = ((data[index][j] * CPCords[0].w) + x1 );
                            x = v;
                            y = y2 - (w);
                            build += SVG.RectGradient(w,w,x,y,"Gradient"+ colorids[c] , r, r, id , "");
                            //namesEven.push( "#"+id ); 
                            //obEven.push({ x: x, y : y, c: c, id: id });
                        }
                    }
                }
               
                build += SVG.closeSVG();
            var svg = UT.HTMLToDiv( build, svgid ); 
            
                
            
              var divv = UT.newAbs("100%", "100%");
              UT.setBG( divv,"transparent");
              divv.appendChild( svg ); 
              CURRENT_IMGS.push( divv );
              
            
             CNTNR.appendChild( divv ); 
            
            
            
            
            //CURRENT_IMGS.push( svg );
           ////console.log( svg ); 
                svg.style.position = "absolute";
                svg.style.display = "";
                svg.style.opacity = 1;
            Ob.ids.points = undefined;
            Ob.ids.evens = obEven;
            Ob.ids.odds = obOdd;
            loadingScreenOff();
            }
            UT.callback( [slower],[100]); 
        }
        
        Ob.toPointsPLC = function( data , targets, order, skip, timeline ){
            if(skip === undefined || skip < 1 ) skip = 1; else skip++;
            if(order=== undefined) order = UT.seq(0, data.length );
                
            
            ////console.log("M: "+M+"\t"+"Y: "+Y+"\t"+"W: "+W+"\t"+"H: "+H+"\t"+"Z: "+Z+"\t"+"M: "+M);

            var svgid = "PointPLC"+UT.count();
            var build = "";
                build += SVG.openSVG( svgid, "100%", "100%")
                      + SVG.openDefinition()
                          + SVG.templates.GradBlueLight0(0)
                          + SVG.templates.GradBlueLight1(1)
                          + SVG.templates.GradBlueLight2(2)
                          + SVG.templates.GradBlueLight3(3)
                          + SVG.templates.GradBlueLight4(4)
                    + SVG.closeDefinition();
                //PLC( PLCords );
                var x, y1, y2, w, h, r, v,c, id, offset = 0;
                var names = [];
                for(var i  = 0, index ; i < order.length; i++ ){
                    index  = order[i];
                    x      = PLCords[i].x1; // x value derived from i, to prevent overlap
                    y1     = PLCords[index].y1;
                    y2     = PLCords[index].y2;
                    w      = 8;
                    h      = y2-y1;
                    r      = w;
                    
                    //build += SVG.Rect( w, h, x, y1, r, r, "black" );
                    //build += SVG.Rect( w, h, x, y2, r, r, "blue" );
                    for( var j = 0; j < targets.length; j+=skip ){
                        id = svgid + "_"+i+"_"+j;
                        v = (data[index][j] * h) + y1;
                        c = targets[j];
                        build += SVG.RectGradient(w,w,x,v-(w/2)-offset,"Gradient"+c, r, r, id, "");
                        names.push( "#"+id ); 
                        ////console.log( x +" "+v);
                
                        //SVG.Rect( w, w, x, v, r, r, "black" );
                      
                    }
                    
                }
                
                build += SVG.closeSVG();
            var svg = UT.HTMLToDiv( build, svgid ); 
                svg.style.position = "absolute";
            CNTNR.appendChild( svg );
           // CURRENT_IMGS.push( svg ); // OK 
            
            
            
            
            Ob.ids.points = names;
            var tl = ( timeline === undefined )  ? anime.timeline({}) : timeline;
            if( order )
              
              //////console.log( names ); 
              /*
              dur = order.length >= 10 ? 0 : 1000;
              tl.add({
                  targets: names,
                  keyframes: [
                    { y:  '+=' + offset },
                  ],
                  delay: anime.stagger(3, {direction: 'normal'}),
                  duration: dur,
                  easing: 'easeOutElastic(2, 2)',
                  loop: false
              });
              */
          return tl;
              
        }
        Ob.toPointsPLCFast = function( skip,order ){
            var data = DATA;
            var targets = TARGETS;
            
            
  
            
            
            
            if(skip === undefined || skip < 1 ) skip = 1; else skip++;
            if(order=== undefined) order = UT.seq(0, data.length );
            var svgid = "PointPLC"+UT.count();
            var gradIndices = [ GRADIENT_INDICES++, GRADIENT_INDICES++, GRADIENT_INDICES++, GRADIENT_INDICES++, GRADIENT_INDICES++ ];
            var build = "";
                build += SVG.openSVG( svgid, "100%", "100%")
                      + SVG.openDefinition()
                          + SVG.templates.GradBlueLight0( gradIndices[0] )
                          + SVG.templates.GradBlueLight1( gradIndices[1] )
                          + SVG.templates.GradBlueLight2( gradIndices[2] )
                          + SVG.templates.GradBlueLight3( gradIndices[3] )
                          + SVG.templates.GradBlueLight4( gradIndices[4] )
                    + SVG.closeDefinition();
                
  
                loadingScreenOn();
                
                
                
                var slower = function(){
                
                //PLC( PLCords );
                var x, y1, y2, w, h, r, v,c, id, fv, offset = 0;
                //var names = [];
                var PLCords= PLCoordinates();
                build += getSVGStringPLC(PLCords); 
                    
                for(var i  = 0, index ; i < order.length; i++ ){
                    index  = order[i];
                    x      = PLCords[i].x1; // x value derived from i, to prevent overlap
                    y1     = PLCords[index].y1;
                    y2     = PLCords[index].y2;
                    w      = 8;
                    h      = y2-y1;
                    r      = w;
                    
                    

                
                
                    for( var j = 0; j < targets.length; j+=skip ){
                        id = svgid + "_"+i+"_"+j;
                        v = Math.ceil((data[index][j] * h) + y1);
                        c = targets[j];
                        
                        fv = Math.ceil( (v-(w/2)-offset) );
                        
                        if( isNaN(fv)){
                          loadingScreenOff();
                          BasicVis.on();
                          alert("Invalid data. Check for missing or non-numeric values.");
                          return;
                        }
                        ////console.log( "! " + x + "\tv:" + v+ "\tw:" + w + "\toffset:" + offset + "\t!: " +  fv );
                        ////console.log( "! " + data[index][j] ); 
                        build += SVG.RectGradient(w,w,x, fv ,"Gradient"+(( gradIndices[c])), r, r, id, "");
                        //names.push( "#"+id ); 
                    }
                    
                }
                
                build += SVG.closeSVG();
                //console.log( "build: " + build );
                
               


            var svg = UT.HTMLToDiv( build, svgid ); 
                svg.style.position = "absolute";
                
              var divv = UT.newAbs("100%", "100%");
            UT.setBG( divv,"transparent");
            CNTNR.appendChild( divv ); 
              
              divv.appendChild( svg ); 
              CURRENT_IMGS.push( divv );
              
          
             
            
             // this one
            
            //Ob.ids.points = names;
            loadingScreenOff();
            }
            UT.callback( [slower],[100]); 
            
            
            
        }
        
  
      
      
      
        Ob.toCPCFcnFast = function(){
            return function(){
                //toCLC();
                Ob.setBG(1);
            }
        }
        
        Ob.toPLCFcn = function(){
            return function(){
                      Ob.setBG(-1);
                      Ob.play();
                      toPLC();
                      UT.callback([function(){
                          Ob.setBG(0);
                          ////console.log(9999);
                          Ob.stop();
                      }],[1000]);
            }
        }
        Ob.toIntroFcn = function(){
            var time = (300 + 400) * len;;
            var t;
            return function(){
              
                      Ob.setBG(-1);
                      Ob.play();
                      t = toIntro();
                      UT.callback([function(){
                          Ob.setBG(0);
                          //console.log(9999);
                          Ob.stop();
                      }],[time]);
                      return t;
            }
          
          
          
          
          //return toIntro();
        } 
        Ob.toIntroFcnFast = function(){
            return function(){
                      Ob.setBG(-1);
                      Ob.play();
                      Ob.setBG(0);
                      Ob.stop();
            }
        }
    return Ob;
    
   
   
        
     
   // document.getElementById("sasa").onclick = function(){
        //myAnimation.start();
    //    //alert();
    //}
}



    function newFixB( w, h, l, b ){
          var id = "container"+(UT.count());
          var el = newEl( "0" , "0", "div");
          el.style.backgroundColor = "white";
          el.style.height   = h;
          el.style.width    = w;
          el.style.left     = l;
          el.style.bottom   = b;
          el.style.position  = "fixed";
          el.id             = id;
          el.style.top      = "";
          //el.className      = "shadowEffect1";
          return el;
      }
    
      function newFixT( w, h, l, t ){
          var id = "container"+(UT.count());
          var el = newEl( "0" , "0", "div");
          el.style.backgroundColor = "white";
          el.style.height   = h;
          el.style.width    = w;
          el.style.left     = l;
          el.style.top      = t;
          el.style.position  = "fixed";
          el.id             = id;
          //el.className      = "shadowEffect1";
          return el;
      }
      
      function container( i ){
          var id = "header_"+i;
          var el = newEl( "0" , "0", "div");
          el.style.backgroundColor = "white";
          el.style.height = "200px";
          el.style.width = "100%";
          el.className = "shadowEffect1";
          UT.setMrgB( el, "10px"); 
          el.id = id;
          return el;
      }
  function lotsoftext(){
    
    return "sdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfhsdlkhfsjdfh";
    
  }
  
  
  /*
function addFooterPlaceHolders(){
    var screen = VIEWS.get(0);
    var PLACE_HOLDERS = [ newRel("100%","50px" ),newRel("100%","50px" ) ];
    for( var i = 0 ; i < PLACE_HOLDERS.length; i++ ){
        var B = 2;
        UT.setBG     (PLACE_HOLDERS[i], "black");
        screen.el.appendChild( PLACE_HOLDERS[i] );
    }
    return PLACE_HOLDERS;
}
*/


    
    //lotsOfThings(controlspace); 
    //lotsOfThings(viewerspace); 
    //lotsOfThings(viewerspace); lotsOfThings(viewerspace); lotsOfThings(viewerspace); lotsOfThings(viewerspace); lotsOfThings(viewerspace); 
    
    
    //var gaga = newRel("100%","1000px" );
    //UT.setBG(gaga, "grey");
    //SUBSECTIONS_1[1].appendChild(gaga);
    //gaga.innerHTML = lotsoftext();

function DynamicTable( rows, cols ){
    var TABLE_COLOR = GREY_2;
    var CELL_WIDTH = 80;
    var name = "table" + UT.count();
    var build = "";
    build += '<table  cellspacing="0" cellpadding="0" id='+(name)+'>'
    for( var i = 0 ; i < rows; i++ ){
        build += '<tr id='+(name+'_row_'+i)+'>';
        for( var j = 0 ; j < cols; j++ ){
          build += '<td> <div contenteditable id='+(name+'_'+i+'_'+j)+'></div></td>'
        }    
        build += '</tr>';
    }
    build += '</table>'
  
    var tablediv = UT.HTMLToDiv( build, name );
        tablediv.style.borderBottom = "1px solid "+TABLE_COLOR;
        tablediv.style.borderRight = "1px solid "+TABLE_COLOR;
        tablediv.style.position = "absolute";
        tablediv.style.left = (rows*CELL_WIDTH/2)+"px";
        tablediv.style.top = "0";
        
    var name2 = name + "Targets";
    var build2 = '<table  cellspacing="0" cellpadding="0" id='+(name2)+'>'
    for( var i = 0 ; i < rows; i++ ){
        build2 += '<tr id='+(name2+'_row_'+i)+'>';
        for( var j = 0 ; j < 1; j++ ){
          build2 += '<td> <div contenteditable id='+(name2+'_'+i+'_'+j)+'></div></td>'
        }    
        build2 += '</tr>';
    }
    build2 += '</table>'
    var targetTable =  UT.HTMLToDiv( build2, name2 );   
        
        
        
    var Ob = {};
        Ob.pr         = B;
        Ob.id         = name;
        Ob.el         = tablediv;
        Ob.tg         = targetTable;
        Ob.r          = rows;
        Ob.c          = cols;
        Ob.rowsHidden = 0;
        Ob.colsHidden = 0;
        Ob.w          = "100px";
        Ob.h          = "25px";
        Ob.colorEven  = "white";
        Ob.colorOdd   = GREY_1;
        Ob.isSelectable = false;
        Ob.setV       = function( r, c, v ){
            var div = document.getElementById(this.id + "_" + r + "_" + c);
            div.innerHTML = v;
        }
        Ob.getV       = function( r, c ){
            var div = document.getElementById(this.id + "_" + r + "_" + c);
            return div.innerHTML;
        }
        Ob.setW = function( v ){
            UT.setW( this.el , v );
        }
        Ob.popupOn = function( par ){
            if( par === undefined ) par = document.body;
            par.appendChild( Ob.popup );
        }
        Ob.popupOff = function(){
            Ob.popup.parentNode.removeChild( Ob.popup );
        }
        Ob.colorAllTest = function(){
          for( var i = 0 ; i < Ob.r; i++ ){
                    for( var j = 0 ; j < Ob.c; j++ ){
                          id = name+'_'+i+'_'+( j );
                          cl = document.getElementById( id );
                          UT.setBG( cl , "yellow");
                          
                    }
                }
        }
        Ob.setColN = function( n ){
            if( n < Ob.c ){
              
                
                var rw, cl, dv, id, pr;
                for( var i = 0 ; i < Ob.r; i++ ){
                    for( var j = n ; j < Ob.c; j++ ){
                          id = name+'_'+i+'_'+( j );
                          cl = document.getElementById( id );
                          pr = cl.parentNode;
                          UT.setDsp( pr , "none"); 
                    }
                }
                Ob.c = n;
                Ob.setColW(CELL_WIDTH+"px");
                Ob.selectable();
                Ob.pastable();
                Ob.keyable();
              
            }
            else
            if( n > Ob.c ){
                var x_cols       = n - Ob.c;
                var current_cols = Ob.c;
                var rw, cl, dv, id;
                for( var i = 0 ; i < Ob.r; i++ ){
                    id = name+'_row_'+(i);
                    rw = document.getElementById(id);
                    ////console.log(  );
                    for( var j = 0 ; j < x_cols; j++ ){
                        id = name+'_'+i+'_'+( current_cols + j );
                        cl = document.createElement('td');
                        dv = UT.HTMLToDiv( '<div contenteditable id='+(id)+'></div>', id );
                        cl.appendChild(dv); 
                        rw.appendChild(cl); 
                    }
                }
              Ob.c = n;
              Ob.setColW(CELL_WIDTH+"px");
              Ob.selectable();
              Ob.pastable();
              Ob.keyable();
            }
        }
        
        Ob.setRowN = function( n ){
          if( n < Ob.r ){
            
              //console.log( "! "+n+" "+Ob.r);
              var rw, cl, dv, id;
              for( var i = n ; i < Ob.r; i++ ){
                  id = name+'_row_'+(i);
                  rw = document.getElementById( id );
                  //console.log( rw );
                  rw.id = undefined;
                  UT.setDsp( rw , "none"); 
              }
              Ob.r = n;
              Ob.setColW(CELL_WIDTH+"px");
              Ob.selectable();
              Ob.pastable();
              Ob.keyable();
              //var x_rows = Ob.r - n;
              //Ob.rowsHidden
              ////alert("rmv rows: "+x_rows);
              ////alert("rows hidden: "+(x_rows));
          }
          else
          if( n > Ob.r ){
              var x_rows = n - Ob.r;
              var current_row = Ob.r;
              var rw, cl, dv, id;
              for( var i = 0 ; i < x_rows; i++ ){
                  rw = document.createElement('tr');
                  rw.id = name+'_row_'+( current_row + i);
                  for( var j = 0 ; j < Ob.c; j++ ){
                      cl = document.createElement('td');
                      id = name+'_'+( current_row + i)+'_'+j;
                      dv = UT.HTMLToDiv( '<div contenteditable id='+(id)+'></div>', id );
                      cl.appendChild( dv ); 
                      rw.appendChild(cl); 
                  } 
                  Ob.el.appendChild( rw );
              }
              Ob.r = n;
              Ob.setColW(CELL_WIDTH+"px");
              Ob.selectable();
              Ob.pastable();
              Ob.keyable();
          }
          
        }
        Ob.setColW = function( v ){
            Ob.w = v;
            for( var i = 0 ; i < this.r; i++ ){
                for( var j = 0 ; j < this.c; j++ ){
                    var div = document.getElementById(this.id + "_" + i + "_" + j);
                    div.parentNode.style.width = Ob.w;
                    div.style.width = Ob.w;
                    div.style.cursor = "cell";
                    div.style.height = Ob.h;
                    div.style.borderLeft = "1px solid "+TABLE_COLOR;
                    div.style.borderTop = "1px solid "+TABLE_COLOR;
                    div.style.overflow = "hidden";
                    div.parentNode.style.overflow = "auto";
                    
                    if( i % 2 != 0 ) div.style.backgroundColor = Ob.colorOdd;
                    else div.style.backgroundColor = Ob.colorEven;
                
                
                }    
            }         
        }
        
        function removeNestedIndices( vals_sorted , missingValueRows ){
            for( var i = 0 ; i < vals_sorted.length; i++ ){
                for( var j = missingValueRows.length - 1; j >= 0; j-- ){
                    vals_sorted[i].splice( missingValueRows[j], 1 );
                }
            }
            return vals_sorted;
        }
        
        function removeIndices( vals , indices ){
            for( var j = indices.length - 1; j >= 0; j-- ){
                vals.splice( indices[j], 1 );
            }
            return vals;
        }
        
        
        function toColumns( vals, colsn ){
                  var vals_sorted = []
                  buf = [];
                  var v;
                  for( var i = 0; i < colsn; i++ ){
                      buf = [];
                      for( var j = i ; j < vals.length; j += colsn ){
                          v = vals[j];
                          buf.push( v )
                      }
                      vals_sorted.push( buf ); 
                  }
                  return vals_sorted;
              }
              
              function toRows( vals, colsn ){
                  var vals_sorted = []
                  buf = [];
                  var r = 0, c = 0;
                  for( var i = 0, j = 0; i < vals.length; i++, j++){
                      if( j === colsn ){
                          vals_sorted.push( buf );
                          j = 0;
                          buf = [];
                          c = 0;
                          r++;
                      } 
                      buf.push( vals[i] );
                      c++;
                  }
                  vals_sorted.push( buf );
              }   
              
              
              function getSkipList( skips, trgtc ){
                  // if empty input box ->  return empty array
                  skips = skips.trim();
                  if(skips.length === 0 ) return [];
                  
                  // convert trgtc to an interger
                  trgtc *= 1;
                  var skips_list = skips_list = skips.split(",");
                  var valid_skips = [];
                  for( var i = 0 ; i < skips.length; i++ ){
                      if( !isNaN(skips[i]) && skips[i]*1 != trgtc ) 
                          valid_skips.push( skips[i] ); 
                  }
                  return valid_skips;
              }
              
              
              function getUnique( data ){
                  var unique = [];
                  for( var i = 0; i < data.length ; i++ ){
                      if( !unique.includes( data[ i ]) )  
                          unique.push( data[ i ] ); 
                  }
                  return unique;
              }
              
              function getRowsMissingValuesSkippingEnumColumns( vals_sorted ){
                  //WILL TOLERATE A COLUMN WITH UP TO 30% MISSING VALUES BEFORE SKIPPING 
                  var enumThreshold = .7;
                  var total_rows, total_NaNs, NaNs, confirmed = [];
                  var likely_not_due_to_lots_of_missing_values;
                  for( var i = 0; i < vals_sorted.length; i++ ){
                      total_rows = vals_sorted[i].length, total_NaNs = 0, NaNs = [];
                      for( var j = 0; j < vals_sorted[i].length; j++ ){
                          if(isNaN( vals_sorted[i][j] )){
                            NaNs.push( j );
                            total_NaNs++;
                          }
                      }
                      if( total_NaNs === 0 ) continue;
                      // ATTEMPT TO NOT CONFUSE ENUMERATION-ROWS WITH MISSING CHARACTERS
                      likely_not_due_to_lots_of_missing_values = total_NaNs / total_rows < enumThreshold;
                      if( likely_not_due_to_lots_of_missing_values ){
                          confirmed = confirmed.concat( NaNs ); 
                      }
                  }
                  //confirmed.push( 617 ); 
                  //console.log("remove the following: " + confirmed ); 
                  confirmed = getUnique( confirmed );
                  //console.log("remove the following: " + confirmed ); 
                  return confirmed;
              }
              
              
              function rankEnumColumns( vals_sorted ){
                  //WILL TOLERATE A COLUMN WITH UP TO 10% MISSING VALUES BEFORE SKIPPING 
                  var enumThreshold = .9;
                  var total_rows, total_NaNs, NaNs, confirmed = [];
                  var likely_an_enum_column;
                  for( var i = 0; i < vals_sorted.length; i++ ){
                      total_rows = vals_sorted[i].length, total_NaNs = 0, NaNs = [];
                      for( var j = 0; j < vals_sorted[i].length; j++ ){
                          if(isNaN( vals_sorted[i][j] )){
                            NaNs.push( j );
                            total_NaNs++;
                          }
                      }
                      if( total_NaNs === 0 ) continue;
                      likely_an_enum_column = total_NaNs / total_rows > enumThreshold;
                      if( likely_an_enum_column ){
                          confirmed.push( i );
                      }
                  }
                  var enumIndex;
                  for( var i =0 ; i < confirmed.length; i++ ){
                      enumIndex = confirmed[i];
                      vals_sorted[i] = Ob.enumerate( vals_sorted[enumIndex] ); 
                  }
                  
                  //console.log(" the following are enums: " + confirmed ); 
                  return vals_sorted;
              }
              
              
             
        Ob.parsePaste = function( text ){
          var submit = document.getElementById( "parse_pasted_data" );
          submit.onclick = function(){
              BAD_ROWS = [];
              loadingScreenOn();
              
              
              
              
              
              var aaaaa = function(){
              
              var colsn = (document.getElementById('input1').value*1);
              var trgtc = (document.getElementById('input2').value*1) - 1;
              var skips = document.getElementById('input3').value;
              
              COLUMNS = colsn;
              
              
              
              
              //var isTSV = document.getElementById('test1').checked;
              //var isCSV = document.getElementById('test2').checked;
              //var isSSV = document.getElementById('test3').checked;
              
              ////console.log(" is TSV: " + isTSV ); 
              ////console.log(" is CSV: " + isCSV ); 
              ////console.log(" is SSV: " + isSSV ); 
              //console.log("Number of Cols: "  + colsn ); 
              //console.log("Target Col: "      + trgtc ); 
              //console.log("Skip Cols: "       + skips ); 
            
              var SPACE_CODE    = (" ").charCodeAt(0);
              var TAB_CODE      = ("\t").charCodeAt(0);
              var COMMA_CODE    = (",").charCodeAt(0);
              var NEWLINE_CODE  = ("\n").charCodeAt(0);
              
              //console.log(" SPACE_CODE: "     + SPACE_CODE ); 
              //console.log(" TAB_CODE: "       + TAB_CODE ); 
              //console.log(" COMMA_CODE: "     + COMMA_CODE ); 
              //console.log(" NEWLINE_CODE: "   + NEWLINE_CODE ); 
              
              
              // STEP 1A - VALIDATE INPUT - COLUMN COUNT
              var colsIsNumeric = !isNaN( colsn ) ;
              var trgtIsNumeric = !isNaN( trgtc ) ;
              if (!colsIsNumeric || !trgtIsNumeric) return;
              
              
              // STEP 1B - VALIDATE INPUT - TRIM PASTED DATA
              text = text.trim();
              while( text.charAt(text.length-1) === NEWLINE_CODE ){
                  text = text.substring(0, text.length-2).trim();
              } 
              
              // STEP 1C - VALIDATE INPUT - PARSE DATA
              var vals = [];
              var trunc;
              if( true ){
                  var buf = "";
                  for( var i = 0; i < text.length; i++ ){
                      if( text.charCodeAt(i) === TAB_CODE   
                           || text.charCodeAt(i) === COMMA_CODE
                           || text.charCodeAt(i) === SPACE_CODE
                           || text.charCodeAt(i) === NEWLINE_CODE
                      ){
                        buf = buf.trim();
                        if(buf.length > 0 ) vals.push( buf );
                        buf = "";
                      } else {
                        buf += text.charAt(i);  
                      }
                  }
                  vals.push( buf )
                  //console.log( vals ); 
              }
              
              // STEP 1D - DERIVE ROWS COUNT
              colsn*=1; rowsn = (vals.length / colsn) * 1;
              
              // STEP 1E - GROUP DATA BY COL
              var vals_sorted = toColumns( vals , colsn ); 
              
              // STEP X - GET SKIP LIST
              var skipList = getSkipList( skips, trgtc );
              
              // STEP 1F - DETACH TARGETS FROM DATA
              var targets = Ob.enumerate( vals_sorted[ trgtc ] );
              
              // STEP X - REMOVE SKIPED COLUMNS
              skipList.push( trgtc );
              skipList = skipList.sort(function(a, b){return a-b});
              for( var i = skipList.length - 1; i >= 0; i-- ){
                vals_sorted.splice( skipList[i], 1 ); 
              }
              
              // STEP X - RETURN IF USER ENTERED ALL VALUES
              if( targets.length === 0 ) return;
              
              // STEP X - LIST ROWS WITH MISSING VALUES SKIPPING ENUMERATION COLUMNS 
              var missingValueRows = getRowsMissingValuesSkippingEnumColumns( vals_sorted ); 
              
              // STEP X - REMOVE NESTED ARRAY VALUES BY INDEX
              vals_sorted = removeNestedIndices( vals_sorted, missingValueRows); 
              
              // STEP X - REMOVE TARGET ARRAY VALUES BY INDEX
              targets = removeIndices( targets, missingValueRows); 
              
              // STEP X - ENUMEERNATE NaN COLUMNS
              vals_sorted = rankEnumColumns( vals_sorted );
              
              //console.log( targets );
              //console.log( vals_sorted );
              
              
              Ob.popupOff();
              rowsn = targets.length;
              colsn = vals_sorted.length;
                
              Ob.setRowN( rowsn ); 
              Ob.setColN( colsn ); 
              
              
            
              // load array values into table
              var v, trunc;
              for( var i = 0 ; i < vals_sorted.length; i++ ){
                  for( var j = 0 ; j < vals_sorted[i].length; j++ ){
                      v = vals_sorted[i][j];
                      trunc = v.length > 9 ? v.substring(0, 9) + "..." : v;
                      Ob.setV(j, i, trunc );
                  }
              }
              
           
              TARGETS   = targets;
              DATA      = vals_sorted;
              
              ////console.log( TARGETS );
              ////console.log( DATA );
              loadingScreenOff();
              }
              UT.callback([aaaaa], [100]);
          }
        }
        Ob.pastable = function(){
          
            
            for( var i = 0 ; i < this.r; i++ ){
                for( var j = 0 ; j < this.c; j++ ){
                    var div = document.getElementById( this.id + "_" + i + "_" + j );
                    div.onpaste = function( e ){
                        EXTENTION_1_INPUT = true;
                        resetTable();
                        e.preventDefault();
                        var el = Ob.selected.length > 1 ? Ob.selected[0] : div;
                        var text = UT.getClipboardText( e );
                        Ob.popupOn();
                        Ob.parsePaste( text );
                        
                        
                    }
                }    
            } 
            
        }
        Ob.keyable = function(){
            for( var i = 0 ; i < this.r; i++ ){
                for( var j = 0 ; j < this.c; j++ ){
                    var div = document.getElementById( this.id + "_" + i + "_" + j );
                    div.onkeydown = function( e ){
                        Ob.keyAction( this, e ); 
                    }
                }    
            }  
          
        }
        
        Ob.highlight    = "#76E5FF";//"#78FFC2";
        Ob.dragfrom     = undefined;
        Ob.dragto       = undefined;
        Ob.fromX        = undefined;
        Ob.fromY        = undefined;
        Ob.isDown       = false;
        Ob.dragSelector = UT.newAbs( "4px", "4px" ); UT.setBG(Ob.dragSelector,Ob.highlight); UT.setO(Ob.dragSelector,"0.5");
        Ob.selected = [];
        Ob.highlightOff = function(){
            Ob.dragSelector.style.display = "";
            var isOdd;
            for( var i = 0 ; i < Ob.selected.length; i++ ){
                 isOdd = (Ob.selected[i].id.split("_")[1]*1) % 2 != 0;
                if( isOdd ) UT.setBG( Ob.selected[i], Ob.colorOdd );
                else        UT.setBG( Ob.selected[i], Ob.colorEven );
                
            }
        }
        Ob.setRowColorGroups = function( rows, colors ){
            // set rows groups, to color x
            // table.setRowColorGroups([[1,3,5],[0,2,4]], ["red", "green"]);
            var rowGroups = [];
            for( var i = 0; i < rows.length; i++ ){
                rowGroups.push( Ob.getRowsDivs( rows[i] ) );
            }

            colorCells();
            
            Ob.el.onmousedown = function(){
                colorCells();
            }    
          
            
            function colorCells(){
                var rows;
                for(var i = 0 ; i < rowGroups.length; i++ ){
                    rows = rowGroups[i];
                    for( var j = 0 ; j < rows.length; j++ ){
                      rows[j].style.backgroundColor = colors[i];
                    }
                }
            }
        }
        Ob.getRowsDivs = function( rows ){
                var divs = [];
                var row;
                for( var i = 0 ; i < rows.length; i++ ){
                    row = rows[i];
                    divs = divs.concat( Ob.getRowDivs( row ) );
                }
                return divs;
        }
        Ob.getRowDivs = function( row ){
            var divs = [];
            var l2  = Ob.c;
            var i = row;
            for( var j = 0 ; j < l2; j++ ){
                    div = document.getElementById(Ob.id + "_" + i + "_" + j);
                    divs.push( div );
            }
            return divs;
        }
        
        
        Ob.setRowsColor = function( rows , color ){
                // set multiple rows to the same color
                // ex: table.setRowsColor( [1,3,5], "red");
                var l2  = Ob.c;
                var divs = Ob.getRowsDivs( rows );
                var r, c;
                
                
                for( var i = 0 ; i < divs.length; i++ ){
                    divs[i].style.backgroundColor = color;
                 }
                

                Ob.el.onmousedown = function(){
                    for(var i = 0 ; i < divs.length; i++ ){
                      divs[i].style.backgroundColor = color;
                    }
                }    
                
        }
        Ob.setRowColor = function( row , color ){
                // set single row to single color
                // ex: table.setRowColor(3, "green");
                var divs = Ob.getRowDivs( row ); 
                for( var i = 0 ; i < divs.length; i++ ){
                  divs[i].style.backgroundColor = color;
                }
                Ob.el.onmousedown = function(){
                    for(var i = 0 ; i < divs.length; i++ ){
                      divs[i].style.backgroundColor = color;
                    }
                }    
                
        }
        Ob.getCellByRowCol = function( r, c ){
            return document.getElementById(Ob.id + "_" + r + "_" + c );
        }
        
        Ob.setCellColor = function( r, c, color  ){
            div = Ob.getCellByRowCol( r, c ); 
            div.style.backgroundColor = color;
            Ob.el.onmousedown = function(){
                div.style.backgroundColor = color;
            }            
        }
        Ob.setColorScheme = function( colorEven, colorOdd ){
            Ob.colorEven  = colorEven;
            Ob.colorOdd   = colorOdd;
          
            var l1 = Ob.r;
            var l2 = Ob.c;
            var div;
            for( var i = 0 ; i < l1; i++ ){
                for( var j = 0 ; j < l2; j++ ){
                    div = document.getElementById(Ob.id + "_" + i + "_" + j);
                    div.style.backgroundColor = i % 2 === 0 ? colorEven : colorOdd;
                }
            }
                  
          //var div = document.getElementById(this.id + "_" + r + "_" + c);
                      
          //Ob.setV
          
        }
        Ob.selectable  = function(){
            Ob.isSelectable = true;
            var dimen, left, top;
            var l = Ob.w.substring(0, Ob.w.length-2);
            var t = Ob.h.substring(0, Ob.h.length-2);
            function mouseUp(){
                        Ob.isDown = false;
                        Ob.dragSelector.style.width =0;
                        Ob.dragSelector.style.height =0;
                        if( Ob.dragfrom === undefined ) return;
                        var dimenFrom = Ob.dragfrom.id.split("_"); 
                        var dimenTo = Ob.dragto.id.split("_"); 
                        var x1 = dimenFrom[1]*1;
                        var y1 = dimenFrom[2]*1;
                        var x2 = dimenTo[1]*1;
                        var y2 = dimenTo[2]*1;
                        var r,c;
                        
                        ////console.log("!: "+x1+","+x2);
                        ////console.log("!: "+y1+","+y2);
                        
                        var div;
                        for( var i = x1; i < x2 + 1; i++ ){
                            for( var j = y1; j < y2 + 1; j++ ){
                              div = document.getElementById(Ob.id + "_"+i+"_"+j);
                              Ob.selected.push( div );
                              UT.setBG( div , Ob.highlight );
                            }
                        }
                        Ob.dragfrom   = undefined;
                        Ob.dragto     = undefined;
            }
            
            
            for( var i = 0 ; i < Ob.r; i++ ){
                for( var j = 0 ; j < Ob.c; j++ ){
                    var div = document.getElementById(Ob.id + "_" + i + "_" + j);
                    div.onmousedown = function( e ){
                        var doubleDown = Ob.isDown === true;
                        if( doubleDown ){
                          return;
                        }
                        Ob.isDown = true;
                        Ob.highlightOff();
                        Ob.dragfrom = this;
                        Ob.dragto   = this;
                        Ob.fromX = e.clientX;
                        Ob.fromY = e.clientY;
                        Ob.dragSelector.style.left    = (window.scrollX + e.clientX)-5 + "px";
                        Ob.dragSelector.style.top     = (window.scrollY + e.clientY)-5 + "px";
                        Ob.pr.appendChild(Ob.dragSelector);
                    }
                    div.onmouseover   = function(){
                        if( Ob.dragfrom !== undefined )
                            Ob.dragto  = this;
                    }
                    div.onmousemove = function(e){
            
                      
                        var dx, dy;
                        if( Ob.dragfrom !== undefined ){
                            ////console.log( Ob.dragfrom.id + " -> " + Ob.dragto.id );
                            dx = e.clientX - Ob.fromX;
                            dy = e.clientY - Ob.fromY;
                                Ob.dragSelector.style.width = dx + "px";
                                Ob.dragSelector.style.height = dy + "px";
                        }
                    }
                    
                    div.onmouseup = function(){
                      mouseUp();
                    }
                 
                }  
                B.parentNode.onmousemove = function(e){
                  /*
                    var h = Ob.h.substring(0, Ob.h.length-2);
                    var yMax = Ob.r*((h*1)+1);
                    if( false && e.clientY >= yMax || e.clientY <= 0 ){
                        Ob.dragSelector.style.display = "none";
                        Ob.dragSelector.style.width = "0";
                        Ob.dragSelector.style.height = "0";
                        Ob.dragfrom     = undefined;
                        Ob.dragto       = undefined;
                        Ob.fromX        = undefined;
                        Ob.fromY        = undefined;
                    }
                    
                    var w = Ob.w.substring(0, Ob.w.length-2);
                    var xMax = Ob.c*((w*1)+2);
                    if( false && e.clientX >= xMax || e.clientX <= 0 ){
                        Ob.dragSelector.style.display = "none";
                        Ob.dragSelector.style.width = "0";
                        Ob.dragSelector.style.height = "0";
                        Ob.dragfrom     = undefined;
                        Ob.dragto       = undefined;
                        Ob.fromX        = undefined;
                        Ob.fromY        = undefined;
                    }
                  */
                        
                }
                B.parentNode.onmousedown = function(e){
                    var h = Ob.h.substring(0, Ob.h.length-2);
                    var yMax = Ob.r*((h*1)+1);
                    var w = Ob.w.substring(0, Ob.w.length-2);
                    var xMax = Ob.c*((w*1)+2);
                    if( e.clientY >= yMax || e.clientX >= xMax ){
                        Ob.highlightOff();
                    }
                }
                
            }
        }
        
        Ob.addPopup = function( e ){
          
          var popup = UT.newAbs("300px", "300px");;
          
          UT.setBG( popup, "white" );
          UT.setT(  popup, "70px" );
          UT.setBor(  popup, "10px solid "+GREY_1 );
          UT.setL(  popup, "calc(50% - 150px)" );
          popup.style.borderRadius = "20px";
          
          /*
          var box1 = UT.newRel("30px", "100px");
          UT.setBor( box1, "1px solid black");
          UT.setDsp( box1, "inline-block");
          //popup.appendChild( box1 ); 
          
          var radio_tab_delimited = document.createElement("INPUT");
          radio_tab_delimited.style.position  = "relative";
          radio_tab_delimited.style.display   = "block";
          radio_tab_delimited.setAttribute("type", "radio");
          radio_tab_delimited.name = "test1";
          
          box1.appendChild( radio_tab_delimited ); 
          radio_tab_delimited.id = "test1";
          
          
          
          var radio_space_delimited2 = document.createElement("INPUT");
          radio_space_delimited2.style.position  = "relative";
          radio_space_delimited2.style.display   = "block";
          radio_space_delimited2.setAttribute("type", "radio");
          radio_space_delimited2.name = "test1";
          box1.appendChild( radio_space_delimited2 ); 
          radio_space_delimited2.id = "test2";
          
          
          var radio_comma_delimited3 = document.createElement("INPUT");
          radio_comma_delimited3.style.position  = "relative";
          radio_comma_delimited3.style.display   = "block";
          radio_comma_delimited3.setAttribute("type", "radio");
          radio_comma_delimited3.name = "test1";
          box1.appendChild( radio_comma_delimited3 ); 
          radio_comma_delimited3.id = "test3";
          
          var box2 = UT.newRel("200px", "100px");
          UT.setBor( box2, "1px solid black");
          UT.setDsp( box2, "inline-block");
          //popup.appendChild( box2 ); 
          
          box2.style.verticalAlign = "top";
          box2.style.paddingLeft = "5px";
          box2.innerHTML += "Delimited by Tab";
          box2.innerHTML += "<br>";
          box2.innerHTML += "Delimited by Comma";
          box2.innerHTML += "<br>";
          box2.innerHTML += "Delimited by Space";
          */
          var box3 = UT.newRel("235px", "auto");
          //UT.setBor( box3, "1px solid black");
          UT.setDsp( box3, "inline-block");
          popup.appendChild( box3 );
          
          
          var p1 = document.createElement("p"); p1.innerHTML = "Number of Columns:";
          p1.style.margin = "0";
          UT.setPos( p1, "relative");
          UT.setDsp( p1, "block");
          box3.appendChild( p1 );
          
          var input1 = document.createElement("INPUT");
          input1.type = "text";
          input1.id = "input1";
          box3.appendChild( input1 );
          
          var p2 = document.createElement("p"); p2.innerHTML = "Target Column:";
          p2.style.margin = "0";
          UT.setPos( p2, "relative");
          UT.setDsp( p2, "block");
          box3.appendChild( p2 );
          
          var input2 = document.createElement("INPUT");
          input2.type = "text";
          input2.id = "input2";
          box3.appendChild( input2 );
          
          var p3 = document.createElement("p"); p3.innerHTML = "Remove Colmns:";
          p3.style.margin = "0";
          UT.setPos( p3, "relative");
          UT.setDsp( p3, "block");
          box3.appendChild( p3 );
          
          var input3 = document.createElement("INPUT");
          input3.type = "text";
          input3.id = "input3";
          box3.appendChild( input3 );
          
          
          UT.setDsp( box3, "block");
          
          var submit = UT.quickBtn(); 
          submit.id ="parse_pasted_data";
          popup.appendChild( submit );
  
          UT.setBG( submit ,"transparent" ); 
          
          
          UT.setBGSVGnot64( submit , TESTP2(), "77%" ); 
        
          
          return popup;
        }
        Ob.keyAction = function( el, e ){
            var code = e.keyCode;
            var LEFT  = code === 37;
            var RIGHT = code === 39;
            var DOWN = code === 40;
            var UP    = code === 38;
            
            var cut = el.id.split("_"); 
            var row = cut[1] * 1;
            var col = cut[2] * 1;
            
            
            var id, div;
            if( DOWN && row < Ob.r - 1){
                id  = cut[0] + "_" + ( row + 1) + "_" + ( col );
                div = document.getElementById(id);
                div.focus();
                if(Ob.isSelectable)Ob.highlightOff();
                Ob.selected.push( div );
                if(Ob.isSelectable)UT.setBG( div , Ob.highlight );
            }
            else
            if( UP && row > 0 ){
                id  = cut[0] + "_" + ( row - 1) + "_" + ( col );
                div = document.getElementById(id);
                div.focus();
                if(Ob.isSelectable)Ob.highlightOff();
                Ob.selected.push( div );
                if(Ob.isSelectable)UT.setBG( div , Ob.highlight );
            }
            else
            if( RIGHT && col < Ob.c - 1 ){
                  id  = cut[0] + "_" + ( row ) + "_" + ( col + 1 );
                  div = document.getElementById(id);
                  div.focus();
                  if(Ob.isSelectable)Ob.highlightOff();
                  Ob.selected.push( div );
                  if(Ob.isSelectable)UT.setBG( div , Ob.highlight );
            }       
            else
            if( LEFT && col > 0 ){
                id  = cut[0] + "_" + ( row ) + "_" + ( col - 1 );
                div = document.getElementById(id);
                div.focus();
                if(Ob.isSelectable)Ob.highlightOff();
                Ob.selected.push( div );
                if(Ob.isSelectable)UT.setBG( div , Ob.highlight );
            }
          
          
          
          
        }
        Ob.enumerate = function( data ){
            
            // STEP 1 - GRAB ALL UNIQUE VALUES
            var unique = [];
            for( var i = 0; i < data.length ; i++ ){
                if( !unique.includes( data[ i ]) )  
                    unique.push( data[ i ]); 
            }
            
            // STEP 1 - SET EACH UNIQUE VALUE TO ITS CORRESPONDING VALUE
            var enumm;
            for( var i = 0; i < data.length ; i++ ){
                enumm = unique.indexOf( data[ i ] );
                data[ i ] = enumm;
            }
            //console.log(  unique );
            //console.log(  data  );
            return data;
        }
        Ob.popup      = Ob.addPopup();
    return Ob;
}          
          
                    
function lotsOfThings( parent ){
  for(var i = 0 ; i < 20; i++ ){
    btn(parent);
  }
}          
   