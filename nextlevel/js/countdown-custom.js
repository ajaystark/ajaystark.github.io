jQuery(document).ready(function() {
        $(function () {
            var array=[1,2,7];

            var map_json={};
            for(const i of array){
                map_json[i] = new Date(2022,11,i,10);
            }
            var currdate=new Date();

            var a=currdate.getDate();
            console.log(map_json[1]);

            if(a<1){
                $('#defaultCountdown').countdown({until:map_json[1]});
                $('#main-title').html("INTEGRAL UNIVERSITY  <br> <span class='id-color' style='color:var(--secondary-color) !important'>Lucknow</span>");
            }
            else if(a<2){
                $('#defaultCountdown').countdown({until:map_json[2]});
                $('#main-title').html("Bennett University <br> <span class='id-color' style='color:var(--secondary-color) !important'>Greater Noida</span>");
            }
            else{
                $('#defaultCountdown').countdown({until:map_json[7]});
                $('#main-title').html("Delhi Technological  <br> University <br> <span class='id-color' style='color:var(--secondary-color) !important'>New Delhi</span>");
            }
            $('#defaultCountdown').countdown({until:map_json[7]});
            $('#main-title').html("Coming <br> <span class='id-color' style='color:var(--secondary-color) !important'>Soon</span>");
        
        });
});		

