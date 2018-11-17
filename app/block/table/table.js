var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

var xhr = new XHR();

xhr.open('GET', 'https://api.jsonbin.io/b/5b683d097b212953678c03dd', true);

xhr.onload = function() {
  var data = JSON.parse(this.responseText);
  for (var i = 1; i < data.length; i++) {
    var hdd = data[i].hdd;
    var cpu = data[i].cpu;
    var ram = data[i].ram;
    var price = data[i].price;

    var hdd0 = data[0].hdd;
    var cpu0 = data[0].cpu;
    var ram0 = data[0].ram;
    var price0 = data[0].price;
    
    var hddSelector = document.querySelector('.hdd');
    var cpuSelector = document.querySelector('.cpu');
    var ramSelector = document.querySelector('.ram');
    var priceSelector = document.querySelector('.price');
    cpuSelector.innerHTML = '<div class="hidden-lg table__title-slot">Процессор</div>'+cpu0;
    hddSelector.innerHTML = '<div class="hidden-lg table__title-slot">Жесткий диск</div>'+hdd0+' '+'ГБ';
    ramSelector.innerHTML = '<div class="hidden-lg table__title-slot">Память</div>'+ram0+' '+'ГБ';
    priceSelector.innerHTML = '<div class="hidden-lg table__title-slot">Цена</div>'+ price0+' '+'₽/мес.';

    var tableContainer = document.querySelector('.table__container');
    var tableContent = document.createElement('div');
    tableContent.className = 'table__content';
    tableContent.innerHTML = '<div class="table__slot"><div class="hidden-lg table__title-slot">Процессор</div>'+cpu+'</div>';
    tableContent.innerHTML += '<div class="table__slot"><div class="hidden-lg table__title-slot">Жесткий диск</div>'+hdd+' '+'ГБ'+'</div>';
    tableContent.innerHTML += '<div class="table__slot"><div class="hidden-lg table__title-slot">Память</div>'+ram+' '+'ГБ'+'</div>';
    tableContent.innerHTML += '<div class="table__slot"><div class="hidden-lg table__title-slot">Цена</div>'+price+' '+'₽/мес.'+'</div>';
    tableContent.innerHTML += '<div class="table__slot"><a class="button" target="_blanck" href="https://selectel.ru/">Заказать</a></button></div>';
    tableContainer.appendChild(tableContent);
  }
}

xhr.onerror = function() {
    var hddSelector = document.querySelector('.hdd');
    var cpuSelector = document.querySelector('.cpu');
    var ramSelector = document.querySelector('.ram');
    var priceSelector = document.querySelector('.price');
    cpuSelector.innerHTML = "Ошибка соединения.";
    hddSelector.innerHTML = "Ошибка соединения.";
    ramSelector.innerHTML = "Ошибка соединения.";
    priceSelector.innerHTML = "Ошибка соединения.";
}

xhr.send();
