"use strict";_F_installCss(".J9U2we{position:absolute;right:0;top:0;bottom:0;left:0;background-color:#f1f3f4;text-align:center;padding:calc(50vh - 100px) calc(50vw - 200px);z-index:1}sentinel{}");
this._=this._||{};(function(_){var window=this;
try{
_.td("map");
var JPb=function(a,b,c){_.pe(_.eqa,d=>{c(d.LM(a,b,_.eC()))})},KPb=class extends _.oB{constructor(a,b=3){super(a,b,12);this.D=_.Tw()}heading(){return this.D}Ji(a){this.D.set(a)}},LPb=function(a){a=a||{};a=a.ri;return(0,_.Ox)('<div class="'+_.U("J9U2we")+" "+_.U("fontDisplayLarge")+'"'+(a!=null?" ssk='"+_.U(_.Tx("MM9olb")+a)+"'":"")+">NO DRAW MODE</div>")};var NPb=function(a){const b=a.qb.get();b?_.gB(b)<=6E4?(a.C.No(b.coords.latitude,b.coords.longitude,b.coords.accuracy),a.D.hide(),a.B||(a.B=c=>{c=-Math.round(c.alpha||0);a.heading&&c===a.heading.XY||(a.heading=a.heading||{XY:0,confidence:1},a.heading.XY=c,a.F.B())},_.p.addEventListener("deviceorientation",a.B))):MPb(a,b):(a.C.hide(),a.D.hide(),a.B&&(_.p.removeEventListener("deviceorientation",a.B),a.B=null))},MPb=function(a,b){a.D.No(b.coords.latitude,b.coords.longitude);a.C.hide()},OPb=class{constructor(a){this.heading=
this.B=null;this.qb=a.qb;this.C=new KPb(a.Gk.ca);this.D=new KPb(a.Gk.ca,4);this.F=_.Uq(()=>{this.C.Ji(this.heading)},300);_.Ut(this.qb,()=>{NPb(this)})}};var PPb=class{LM(a,b,c){var d=_.xp();_.D(d,48)?(_.SB(a.Ud,"map"),(new _.tC(a.jb,LPb,b,{})).show()):JPb(a,b,c)}A5(a){new OPb(a)}};_.ef(_.bqa,new PPb);
_.Uj();
}catch(e){_._DumpException(e)}
}).call(this,this._);
// Google Inc.
