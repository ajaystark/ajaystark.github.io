jQuery(document).ready(function() {
        $(function () {
            var array=[5,6,9];

            var map_json={};
            for(const i of array){
                map_json[i] = new Date(2022,8,i,10);
            }
            var currdate=new Date();

            // console.log(map_json);
            console.log(currdate);
            // console.log(map_json[currdate.getDate()]);
            // $('#defaultCountdown').countdown({until:map_json[currdate.getDate()]});

            var a=currdate.getDate();
            if(a<6){
                $('#defaultCountdown').countdown({until:map_json[5]});
                $('#main-title').html("Lovely Professional <br> University ,");
            }
            else if(a<7){
                $('#defaultCountdown').countdown({until:map_json[6]});
                $('#main-title').html("CHANDIGARH University <br> (Chitkara),");
            }
            else if(a<10){
                $('#defaultCountdown').countdown({until:map_json[9]});
                $('#main-title').html("Amity University ,<br>");
            }
        });
});		

