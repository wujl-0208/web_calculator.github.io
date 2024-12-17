
function ar(Startage, Endage, Ageflb, Agemen, Nbiops, Numrel, Weight, Density) {
// 定义h1和h2数组，乘以1e-5
    const h1 = [0.2, 1.5, 4.7, 10.5, 23.0, 37.1, 45.3, 54.5, 71.9, 94.5, 111.0, 112.1, 104.9, 83.3].map(x => x * 10**(-5));
    const h2 = [48.8, 68.1, 92.8, 118.3, 153.2, 223.6, 341.6, 517.5, 747.0, 1087.2, 1764.2, 2940.6, 5141.9, 13414.7].map(x => x * 10**(-5));

    // 计算rr
    const rr = Math.exp(0.145 * Ageflb + 0.123 * Agemen + 0.24 * Nbiops + 0.641 * Numrel + 0.177 * Weight + 0.412 * Density);

    // 计算i和j
    let i = Math.min(Math.floor((Startage - 15) / 5), 14)-1;
    let j = Math.min(Math.ceil((Endage - 20) / 5), 14)-1;

    let y = 0;
    let c = 1;

    for (let k = i; k <= j; k++) {
        let length;
        if (k == i) {
            length = Math.min(Endage, 20 + 5 * (i+1)) - Startage;
        } else if (k == j) {
            length = Endage - 15 - 5 * (j+1);
        } else {
            length = 5;
        }

        y += h1[k] * rr / (h1[k] * rr + h2[k]) * (1 - Math.exp(-(h1[k] * rr + h2[k]) * length)) * c;
        c *= Math.exp(-(h1[k] * rr + h2[k]) * length);
    }

    return y;
}
function calculate() {
    // 获取表单中的数据
    const input_Startage = document.getElementById('Startage');
    const Startage = input_Startage.value;
    if (!Startage) {
        alert("请输入您的年龄！");
        location.reload();
    }
    // if (Startage == "" || isNaN(Startage) || Startage < 20 || Startage > 85) {
    //     alert("请输入您的年龄（20-85岁）！");
    //     // 重新加载页面
    //     location.reload();
    // }
    let Endage = Number(Startage) + 5;
    
    const radios_Ageflb = document.getElementsByName('Ageflb');
    let selectedValue_Ageflb;
    for (const radio of radios_Ageflb) {
        if (radio.checked) {
            selectedValue_Ageflb = radio.value;
            break;
        }
    } 
    const Ageflb = selectedValue_Ageflb;

    const radios_Agemen = document.getElementsByName('Agemen');
    let selectedValue_Agemen;
    for (const radio of radios_Agemen) {
        if (radio.checked) {
            selectedValue_Agemen = radio.value;
            break;
        }
    }
    const Agemen = selectedValue_Agemen;

    const radios_Nbiops = document.getElementsByName('Nbiops');
    let selectedValue_Nbiops;
    for (const radio of radios_Nbiops) {
        if (radio.checked) {
            selectedValue_Nbiops = radio.value;
            break;
        }
    }
    const Nbiops = selectedValue_Nbiops;

    const radios_Numrel = document.getElementsByName('Numrel');
    let selectedValue_Numrel;
    for (const radio of radios_Numrel) {
        if (radio.checked) {
            selectedValue_Numrel = radio.value;
            break;
        }
    }
    const Numrel = selectedValue_Numrel;

    const radios_Weight = document.getElementsByName('Weight');
    let selectedValue_Weight;
    for (const radio of radios_Weight) {
        if (radio.checked) {
            selectedValue_Weight = radio.value;
            break;
        }
    }
    const Weight = selectedValue_Weight;

    const radios_Density = document.getElementsByName('Density');
    let selectedValue_Density;
    for (const radio of radios_Density) {
        if (radio.checked) {
            selectedValue_Density = radio.value;
            break;
        }
    }
    const Density = selectedValue_Density;

    let AgeflbCategory;
    if (Ageflb == "under20"){
        AgeflbCategory = 0;
    }
    else if (Ageflb == "20-24"){
        AgeflbCategory = 1;
    }
    else if (Ageflb == "25-29或未经产"){
        AgeflbCategory = 2;
    }else {
        AgeflbCategory = 3;
    }

    let AgemenCategory;
    if (Agemen == "over14"){
        AgemenCategory = 0;
    }
    else if (Agemen == "12-13"){
        AgemenCategory = 1;
    }
    else {
        AgemenCategory = 2;
    }

    let NbiopsCategory;
    if (Nbiops == "0"){
        NbiopsCategory = 0;
    }
    else if (Nbiops == "1"){
        NbiopsCategory = 1;
    }
    else {
        NbiopsCategory = 2;
    }

    let NumrelCategory;
    if (Numrel == "0"){
        NumrelCategory = 0;
    }
    else if (Numrel == "1"){
        NumrelCategory = 1;
    }
    else {
        NumrelCategory = 2;
    }
    
    let weightCategory;
    if (Weight == "under100") {
        weightCategory = 0;
    } else if (Weight == "101-125") {
        weightCategory = 1;
    } else if (Weight == "126-150") {
        weightCategory = 2;
    }else if (Weight == "151-175"){
        weightCategory = 3;
    }else if (Weight == "176-200"){
        weightCategory = 4;
    }else {
        weightCategory = 5;
    }

    let DensityCategory;
    if (Density == "0%"){
        DensityCategory = 0;
    }
    else if (Density == "0%-25%"){
        DensityCategory = 1;
    }
    else if (Density == "25%-50%"){
        DensityCategory = 2;
    }
    else if (Density == "50%-75%"){
        DensityCategory = 3;
    }
    else {
        DensityCategory = 4;
    }
    
    // 调用函数并获取结果
    const result1 = ar(Startage, Endage, AgeflbCategory, AgemenCategory, NbiopsCategory, NumrelCategory, weightCategory, DensityCategory);
    const result2 = ar(Startage, 90, AgeflbCategory, AgemenCategory, NbiopsCategory, NumrelCategory, weightCategory, DensityCategory);
    
    let list_5 = [0.3, 0.3, 0.4, 0.5, 0.5, 0.6, 0.7, 0.7, 0.8, 0.9,
        1, 1, 1.1, 1.2, 1.2, 1.3, 1.3, 1.4, 1.4, 1.4,
        1.5, 1.5, 1.6, 1.7, 1.7, 1.8, 1.8, 1.9, 1.9, 2,
        2, 2.1, 2.1, 2.1, 2.2, 2.2, 2.2, 2.2, 2.2, 2.2,
        2.2, 2.2, 2.2, 2.2, 2.1, 2, 2, 1.9, 1.8, 1.6, 1.4
        ];
    
        let list_90 = [12.6, 12.5, 12.5, 12.4, 12.4, 12.4, 12.3, 12.2, 12.1, 12,
        11.9, 11.8, 11.6, 11.5, 11.3, 11.2, 11, 10.8, 10.6, 10.4,
        10.2, 10, 9.8, 9.5, 9.3, 9.1, 8.8, 8.6, 8.3, 8.1,
        7.8, 7.5, 7.2, 6.9, 6.6, 6.3, 6, 5.7, 5.4, 5.1,
        4.7, 4.4, 4.1, 3.8, 3.4, 3.1, 2.8, 2.5, 2.1, 1.8, 1.4
        ];
    
        const pieData1 = {      
        data: [result1, 1-result1], // 将result1分成两部分
        backgroundColor: ['red', 'white'],
    };

        const pieData2 = {
        data: [result2 , 1-result2], // 将result2分成两部分
        backgroundColor: ['red', 'white'],
    }; 
        const pieData3 = {
        data: [list_5[Startage-35]/100, 1-list_5[Startage-35]/100], 
        backgroundColor: ['#00008B', 'white'],
    };

        const pieData4 = {
        data: [list_90[Startage-35]/100, 1-list_90[Startage-35]/100], 
        backgroundColor: ['#00008B', 'white'],
    };
    // 显示结果
    document.getElementById('result1').innerText = '五年患乳腺癌绝对风险: ' + (result1*100).toFixed(3)+'%'; // 保留三位小数
    document.getElementById('result2').innerText = '终身患乳腺癌绝对风险: ' + (result2*100).toFixed(3)+'%'; // 保留三位小数

    // 更新饼图
    updatePieCharts(pieData1, pieData2,pieData3,pieData4);
    const fig1 = document.getElementById('fig1');
    const fig2 = document.getElementById('fig2');
    fig1.style.display = 'flex';
    fig2.style.display = 'flex';
}

function updatePieCharts(data1, data2,data3,data4) {
    const ctx1 = document.getElementById('pieChart1').getContext('2d');
    const pieChart1 = new Chart(ctx1, {
        type: 'pie',
        data: {
            
            datasets: [{
                data: data1.data,
                backgroundColor: data1.backgroundColor,
                borderColor: 'transparent', 
                borderWidth: 0 
            }]
        },
        options: {
            responsive: false, maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });
    const text_1 = document.createElement('p');
    text_1.innerText = (data1.data[0] * 100).toFixed(1) + '%';
    text_1.style.position = 'absolute';
    text_1.style.top = '7vh'; // 调整文本的位置，确保在标题下方
    text_1.style.left = '21%';
    // text_1.style.transform = 'translateX(-50%)'; // 这里可能不需要，因为left已经设置了具体的百分比位置
    text_1.style.fontSize = '3.5vh';
    text_1.style.color = '#00008B';
    text_1.style.fontWeight = 'bold';
    document.getElementById('fig1').appendChild(text_1);
    

    const text_2 = document.createElement('p');
    text_2.innerText = (data3.data[0] * 100).toFixed(1) + '%';
    text_2.style.position = 'absolute';
    text_2.style.top = '7vh'; // 与text_1相同的top值，因为它们应该在同一水平线上
    text_2.style.left = '50%'; 
    text_2.style.fontSize = '3.5vh';
    text_2.style.color = '#00008B';
    text_2.style.fontWeight = 'bold';
    document.getElementById('fig1').appendChild(text_2);

    document.getElementById('title_1_element').innerText = '5年内患乳腺癌的绝对风险';
    document.getElementById('explation_1').innerText = '基于您提供的信息，您在五\n年内患乳腺癌的绝对风险为\n'+ (data1.data[0]*100).toFixed(1)+'%'
    +'。而在整个美国，与您\n相同年龄的白人女性五年内\n患乳腺癌的绝对风险为'+ (data3.data[0] * 100).toFixed(1) + '%';


    // 将文本添加到饼图的容器中
    // const container = document.getElementById('fig1');
    // container.appendChild(text_1);
    // container.appendChild(text_2);
    // container.appendChild(title_1);
    const ctx2 =  document.getElementById('pieChart2').getContext('2d');
    const pieChart2 = new Chart(ctx2, {
        type: 'pie',
        data: {
            
            datasets: [{
                data: data2.data,
                backgroundColor: data2.backgroundColor,
                borderColor: 'transparent', 
                borderWidth: 0 
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });

    
    const ctx3 =  document.getElementById('pieChart3').getContext('2d');
    const pieChart3 = new Chart(ctx3, {
        type: 'pie',
        data: {

            datasets: [{
                data: data3.data,
                backgroundColor: data3.backgroundColor,
                borderColor: 'transparent', 
                borderWidth: 0 
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            }}})

    const ctx4 = document.getElementById('pieChart4').getContext('2d');
    const pieChart4 = new Chart(ctx4, {
        type: 'pie',
        data: {
            datasets: [{
                data: data4.data,
                backgroundColor: data4.backgroundColor,
                borderColor: 'transparent', // 确保边框是透明的
                borderWidth: 0 // 对于饼图来说，这通常是多余的，因为默认边框宽度就是0
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },

        }
    });    
    document.getElementById('title_2_element').innerText = '终身患乳腺癌的绝对风险';
    const text_3 = document.createElement('p'); 
    text_3.innerText = (data2.data[0] * 100).toFixed(1) + '%';
    text_3.style.position = 'absolute';
    text_3.style.top = '7vh'; // 调整文本的位置
    text_3.style.left = '21%';
    text_3.style.fontSize = '3.5vh'; // 增大字体
    text_3.style.color = '#00008B';
    text_3.style.fontWeight = 'bold';
    document.getElementById('fig2').appendChild(text_3);

    const text_4 = document.createElement('p');
    text_4.innerText = (data4.data[0] * 100).toFixed(1) + '%';
    text_4.style.position = 'absolute';
    text_4.style.top = '7vh'; // 调整文本的位置
    text_4.style.left = '50%';
    text_4.style.fontSize = '3.5vh'; // 增大字体
    text_4.style.color = '#00008B';
    text_4.style.fontWeight = 'bold';
    document.getElementById('fig2').appendChild(text_4);

    document.getElementById('explation_2').innerText = '基于您提供的信息，您的终\n身（直到90岁）患乳腺癌的\n绝对风险为'+ (data2.data[0]*100).toFixed(1)+'%'
    +'。而在整个\n美国，与您相同年龄的白人\n女性终身患乳腺癌的绝对风\n险为'+ (data4.data[0] * 100).toFixed(1) + '%';

    // 将文本添加到饼图的容器中
    // const container2 = document.getElementById('fig2');
    // container2.appendChild(text_3);
    // container2.appendChild(text_4);
}



document.getElementById('calculateButton').addEventListener('click', calculate);