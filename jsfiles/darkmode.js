
document.addEventListener('mousemove', showImgContent);

var btnT = document.getElementById("togglemodebtn");
btnT.addEventListener("click", function(E){
                        if(E.target.textContent==="Dark Mode"){
                          E.target.textContent = "Light Mode";
                        }
                        else{
                          E.target.textContent = "Dark Mode";
                        }
});
function toggleBG() {
 var element = document.body;
 element.classList.toggle("dark-mode");
}