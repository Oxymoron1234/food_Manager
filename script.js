/*jshint esversion: 6 */
fetch("./data.json")
    .then(response => response.json())
    .then(data => {
        const type = document.querySelector(".type");
        const brand = document.querySelector(".brand");
        const addBtn = document.querySelector(".addBtn");
        const weight = document.querySelector(".weight");
        const quantity = document.querySelector(".quantity");
        const micBtnDiv = document.querySelector(".micBtnDiv");
        const replaceBtn = document.querySelector(".replaceBtn");
        const productName = document.querySelector(".productName");
        const calculator = document.querySelector(".calculator-grid");
        const filledValue = document.querySelector("#current-operand");
        const numberButtons = document.querySelectorAll('[data-number]');
        const returnButton = document.querySelector('[data-equals]');
        let extraquantity = 0;
        let counter = false;
        let randomNumber=0;
        let dataArr = [];
        let actualQuantity = 0;
        let table;
        let dataId;
        let add = false;
        let replace = false;
        micBtnDiv.addEventListener("click", () => { 
            fetchData();
        }
        );
        quantity.addEventListener("click", () => {
            calculator.style.display = "grid";
        });
        numberButtons.forEach(button => {
            button.addEventListener('click', () => {
                filledValue.value = button.innerText;
                extraquantity = button.innerText;
                quantity.innerHTML = button.innerText;
                counter = true;
            });
        });
        function fetchData() {
            fetchClr();
            add = false;
            replace = false;
            randomNumber = Math.floor((Math.random() * 6));
            counter = false;
            
            addBtn.addEventListener("click", () => {
                if (dataArr.includes(data[randomNumber].id)) {
                    add= true;
                    delD(); 
                    addD(randomNumber); 
                } 
                document.getElementById("data-body").innerHTML += table;
                dataArr.push(dataId);
            });
            replaceBtn.addEventListener("click", () => {
                if (dataArr.includes(data[randomNumber].id)) {
                    replace = true;
                    delD();
                    addD(randomNumber);  
                } 
                document.getElementById("data-body").innerHTML += table;
                dataArr.push(dataId);
            });
            
            if (dataArr.includes(data[randomNumber].id)) {
                replaceBtn.style.visibility = "visible";
                addD(randomNumber);
            } else {
                replaceBtn.style.visibility = "hidden";
                addD(randomNumber);
            }
            returnButton.addEventListener("click", () => {
                calculator.style.display = "none";
                addD(randomNumber);
            });
        }
        function addD(randomNumber) {
            if (counter && add) {
                actualQuantity = (parseInt(data[randomNumber].quantity) + parseInt(extraquantity)).toString();
            }else if (counter && replace) {
                actualQuantity =  parseInt(extraquantity);
            } 
             else {
                actualQuantity = data[randomNumber].quantity;
            }
            // if (dataArr.includes(data[randomNumber].id)) {
            //     actualQuantity = parseInt(data[randomNumber].quantity) + parseInt(data[randomNumber].quantity);
            // }
            productName.innerHTML = data[randomNumber].item;
            brand.innerHTML = data[randomNumber].brand;
            type.innerHTML = data[randomNumber].sub_type;
            quantity.innerHTML = actualQuantity;
            weight.innerHTML = data[randomNumber].sizing;
            table = ` <tr>
            <td>${data[randomNumber].item}</td> <td>${data[randomNumber].brand}</td><td>${data[randomNumber].sub_type}</td> <td>${data[randomNumber].sizing}</td> <td>${actualQuantity}</td>
            </tr> `;
            dataId = data[randomNumber].id;
            
        }
        function delD() {
            console.log(dataArr);
            document.getElementById("data-body").deleteRow(dataArr.indexOf(dataId));
            dataArr.splice(dataArr.indexOf(dataId), 1);
            console.log(dataArr);
        }
        function fetchClr() {
            productName.style.animation = "myfirst 1s 1";
            productName.style.transition = "text 0.5s ease";
            brand.style.animation = "myfirst 1s 1";
            type.style.animation = "myfirst 1s 1";
            quantity.style.animation = "myfirst 1s 1";
            weight.style.animation = "myfirst 1s 1";
        }
    });


// const insertItem = (arr,idx,val) => {
//     for(let i=arr.length;i>idx;i--){
//         arr[i] = arr[i-1];
//     }
//     arr[idx] = val;
//     return arr;
// }
// const insertItem = (arr,idx,val) => {
//     const x = arr[idx];
//     arr[idx] = val;
//     return [...arr,x];
// }

