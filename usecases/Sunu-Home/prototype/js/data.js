/* Sunú Home · content */
window.DATA = {
  ingredients: [
    { id:'eggs', en:'Eggs', es:'Huevos', c:'#FFD447', qty:{en:'8 left',es:'quedan 8'} },
    { id:'tomato', en:'Tomatoes', es:'Jitomates', c:'#F40046', soon:true, qty:{en:'use in 2 days',es:'úsalos en 2 días'} },
    { id:'onion', en:'White onion', es:'Cebolla blanca', c:'#E9D8C4', qty:{en:'2',es:'2'} },
    { id:'serrano', en:'Serrano chiles', es:'Chiles serranos', c:'#0F9D8F', qty:{en:'6',es:'6'} },
    { id:'tortilla', en:'Corn tortillas', es:'Tortillas de maíz', c:'#F2C27B', qty:{en:'1 pack',es:'1 paquete'} },
    { id:'chicken', en:'Chicken breast', es:'Pechuga de pollo', c:'#FF9BD0', qty:{en:'500 g',es:'500 g'} },
    { id:'milk', en:'Milk', es:'Leche', c:'#DCD5FF', qty:{en:'1/4 carton',es:'1/4 de cartón'} },
    { id:'queso', en:'Queso fresco', es:'Queso fresco', c:'#FFF0B8', qty:{en:'250 g',es:'250 g'} },
    { id:'crema', en:'Crema', es:'Crema', c:'#FFFFFF', soon:true, qty:{en:'use tomorrow',es:'úsala mañana'} },
    { id:'rice', en:'Rice', es:'Arroz', c:'#F3EEE7', qty:{en:'1 kg',es:'1 kg'} },
    { id:'fideo', en:'Fideo pasta', es:'Fideo', c:'#FFB547', qty:{en:'2 packs',es:'2 paquetes'} },
    { id:'cilantro', en:'Cilantro', es:'Cilantro', c:'#3FB950', soon:true, qty:{en:'use today',es:'úsalo hoy'} },
    { id:'lime', en:'Limes', es:'Limones', c:'#D8F25A', qty:{en:'5',es:'5'} },
    { id:'beans', en:'Pinto beans', es:'Frijoles pintos', c:'#8C4A2F', qty:{en:'1 can',es:'1 lata'} }
  ],
  recipes: [
    { id:'chila', ready:true, c:'green', art:'sun',
      en:'Green chilaquiles', es:'Chilaquiles verdes', time:20, level:{en:'Easy',es:'Fácil'},
      why:{en:'Uses your crema and cilantro before they turn',es:'Usa tu crema y cilantro antes de que se echen a perder'},
      ing:['tortilla','tomato','serrano','onion','crema','queso','cilantro','eggs'],
      steps:[
        {en:'Cut the tortillas in triangles and toast them on the comal until crisp.',es:'Corta las tortillas en triángulos y dóralas en el comal hasta que estén crujientes.',t:0},
        {en:'Boil the tomatoes, serranos and a piece of onion for 8 minutes.',es:'Hierve los jitomates, los serranos y un trozo de cebolla por 8 minutos.',t:480},
        {en:'Blend with a pinch of salt and simmer the salsa for 5 minutes.',es:'Licúa con una pizca de sal y deja hervir la salsa 5 minutos.',t:300},
        {en:'Fold the totopos into the salsa, plate, and finish with crema, queso and cilantro.',es:'Mezcla los totopos con la salsa, sirve y termina con crema, queso y cilantro.',t:0}
      ]},
    { id:'huevos', ready:true, c:'yellow', art:'dots',
      en:'Huevos a la mexicana', es:'Huevos a la mexicana', time:15, level:{en:'Easy',es:'Fácil'},
      why:{en:'Ready with what you have right now',es:'Listo con lo que tienes ahorita'},
      ing:['eggs','tomato','onion','serrano','tortilla'],
      steps:[
        {en:'Dice the tomato, onion and serrano.',es:'Pica el jitomate, la cebolla y el serrano.',t:0},
        {en:'Sauté the onion and serrano for 3 minutes, then add the tomato.',es:'Sofríe la cebolla y el serrano 3 minutos y agrega el jitomate.',t:180},
        {en:'Add the beaten eggs and stir gently until just set. Serve with warm tortillas.',es:'Agrega los huevos batidos y mueve suave hasta que cuajen. Sirve con tortillas calientes.',t:0}
      ]},
    { id:'fideo', ready:true, c:'orange', art:'waves',
      en:'Sopa de fideo', es:'Sopa de fideo', time:25, level:{en:'Easy',es:'Fácil'},
      why:{en:'A kid favorite with pantry staples',es:'La favorita de los niños con básicos de la alacena'},
      ing:['fideo','tomato','onion','lime','crema'],
      steps:[
        {en:'Toast the fideo in a little oil until golden.',es:'Dora el fideo en poquito aceite.',t:120},
        {en:'Blend tomato and onion with water, pour over the fideo and simmer.',es:'Licúa jitomate y cebolla con agua, viértelo sobre el fideo y deja hervir.',t:720},
        {en:'Serve with a squeeze of lime and a spoon of crema.',es:'Sirve con limón y una cucharada de crema.',t:0}
      ]},
    { id:'tinga', ready:true, c:'chipotle', art:'ring',
      en:'Chicken tinga tostadas', es:'Tostadas de tinga', time:35, level:{en:'Medium',es:'Media'},
      why:{en:'Your chicken is best cooked by Saturday',es:'Tu pollo conviene cocinarlo antes del sábado'},
      ing:['chicken','tomato','onion','tortilla','crema','beans'],
      steps:[
        {en:'Poach the chicken for 20 minutes and shred it.',es:'Cuece el pollo 20 minutos y deshébralo.',t:1200},
        {en:'Sauté sliced onion, add blended tomato and the chicken.',es:'Sofríe la cebolla en rodajas, agrega el jitomate licuado y el pollo.',t:420},
        {en:'Fry or toast the tortillas, spread beans and top with tinga and crema.',es:'Dora las tortillas, unta frijoles y sirve la tinga con crema.',t:0}
      ]},
    { id:'pasta', ready:false, missing:{en:'Chipotles in adobo',es:'Chiles chipotles en adobo',id:'chipotle',price:24}, c:'peach', art:'arch', sunu:true,
      en:'Creamy chipotle pasta', es:'Pasta cremosa al chipotle', time:30, level:{en:'Easy',es:'Fácil'},
      why:{en:'Sunú’s house favorite, made at home',es:'La favorita de Sunú, hecha en casa'},
      ing:['fideo','crema','milk','queso','onion','chipotle'],
      steps:[
        {en:'Cook the pasta in salted water until al dente.',es:'Cuece la pasta en agua con sal hasta que esté al dente.',t:540},
        {en:'Blend crema, milk, queso and chipotle until smooth.',es:'Licúa crema, leche, queso y chipotle hasta que quede terso.',t:0},
        {en:'Warm the sauce, fold in the pasta and serve.',es:'Calienta la salsa, mezcla con la pasta y sirve.',t:180}
      ]},
    { id:'arroz', ready:false, missing:{en:'Carrots',es:'Zanahorias',id:'carrot',price:18}, c:'red', art:'grid',
      en:'Red rice with vegetables', es:'Arroz rojo con verduras', time:40, level:{en:'Medium',es:'Media'},
      why:{en:'Stretches into lunch boxes for tomorrow',es:'Rinde para los lunch boxes de mañana'},
      ing:['rice','tomato','onion','serrano','carrot'],
      steps:[
        {en:'Rinse and fry the rice until it sounds sandy.',es:'Lava y fríe el arroz hasta que suene como arena.',t:300},
        {en:'Add blended tomato and onion, then the carrots and water.',es:'Agrega jitomate y cebolla licuados, luego zanahoria y agua.',t:0},
        {en:'Cover and cook on low for 20 minutes.',es:'Tapa y cocina a fuego bajo 20 minutos.',t:1200}
      ]}
  ],
  extra: { chipotle:{en:'Chipotles in adobo',es:'Chiles chipotles en adobo'}, carrot:{en:'Carrots',es:'Zanahorias'} },
  list: [
    { id:'milk', en:'Milk', es:'Leche', why:{en:'Runs out in 2 days',es:'Se acaba en 2 días'}, g:'dairy', c:'violet', p:[29,31,30,34,32,0] },
    { id:'tortilla2', en:'Corn tortillas', es:'Tortillas de maíz', why:{en:'Runs out Thursday',es:'Se acaban el jueves'}, g:'pantry', c:'yellow', p:[22,24,23,26,25,20] },
    { id:'avocado', en:'Avocados', es:'Aguacates', why:{en:'For the tostadas',es:'Para las tostadas'}, g:'produce', c:'lime', p:[54,58,56,64,60,40] },
    { id:'onion2', en:'White onion', es:'Cebolla blanca', why:{en:'Down to 2',es:'Quedan 2'}, g:'produce', c:'cream', p:[18,19,18,22,20,14] },
    { id:'yogurt', en:'Plain yogurt', es:'Yogur natural', why:{en:'Lunch boxes',es:'Lunch boxes'}, g:'dairy', c:'pink', p:[38,36,39,44,40,0] },
    { id:'beans2', en:'Pinto beans', es:'Frijoles pintos', why:{en:'Last can',es:'Última lata'}, g:'pantry', c:'orange', p:[21,22,20,27,23,0] },
    { id:'cilantro2', en:'Cilantro', es:'Cilantro', why:{en:'Weekly',es:'Semanal'}, g:'produce', c:'teal', p:[9,10,9,12,10,5] }
  ],
  stores: [
    { id:'walmart', name:'Walmart', branch:'Independencia', mark:'W', sc:'#0071CE', sf:'#FFC220', km:2.1 },
    { id:'soriana', name:'Soriana', branch:'Universidad', mark:'S', sc:'#E4002B', sf:'#fff', km:3.4 },
    { id:'chedraui', name:'Chedraui', branch:'Asunción', mark:'C', sc:'#F26A21', sf:'#fff', km:4.0 },
    { id:'lacomer', name:'La Comer', branch:'Altaria', mark:'LC', sc:'#C8102E', sf:'#fff', km:5.2 },
    { id:'heb', name:'HEB', branch:'Santa Mónica', mark:'H', sc:'#DC291E', sf:'#fff', km:6.3 },
    { id:'teran', name:'Mercado Terán', branch:'Centro', mark:'MT', sc:'#1C1830', sf:'#D8F25A', km:3.9, market:true }
  ],
  zones: [
    { n:1, x:50, y:16, c:'violet', en:'Top shelf', es:'Repisa de arriba',
      what:{en:'Leftovers, queso fresco, ready to eat food',es:'Sobras, queso fresco, comida lista'},
      why:{en:'The most stable temperature in the fridge, and it sits at eye level, so nothing gets forgotten.',es:'Es la temperatura más estable del refri y queda a la vista, así nada se olvida.'} },
    { n:2, x:50, y:37, c:'yellow', en:'Middle shelf', es:'Repisa de en medio',
      what:{en:'Eggs, milk, crema, yogurt',es:'Huevos, leche, crema, yogur'},
      why:{en:'Dairy and eggs last longer here than in the door, where the temperature swings every time you open it.',es:'Los lácteos y huevos duran más aquí que en la puerta, donde la temperatura cambia cada vez que abres.'} },
    { n:3, x:50, y:57, c:'red', en:'Bottom shelf', es:'Repisa de abajo',
      what:{en:'Raw chicken and meat, on a tray',es:'Pollo y carne cruda, en un recipiente'},
      why:{en:'The coldest shelf, and if anything drips it never lands on food you eat raw.',es:'Es la repisa más fría y, si algo gotea, nunca cae sobre comida que comes cruda.'} },
    { n:4, x:30, y:80, c:'teal', en:'Left drawer', es:'Cajón izquierdo',
      what:{en:'Cilantro, chiles, leafy greens',es:'Cilantro, chiles, verduras de hoja'},
      why:{en:'High humidity keeps herbs and chiles crisp. Wrap cilantro in a damp towel.',es:'La humedad alta mantiene firmes las hierbas y chiles. Envuelve el cilantro en una servilleta húmeda.'} },
    { n:5, x:70, y:80, c:'orange', en:'Right drawer', es:'Cajón derecho',
      what:{en:'Limes, ripe avocados, fruit',es:'Limones, aguacates maduros, fruta'},
      why:{en:'Low humidity for fruit. Keep it apart from greens, since fruit releases gas that ripens them too fast.',es:'Humedad baja para la fruta. Sepárala de las verduras, porque suelta un gas que las madura muy rápido.'} },
    { n:6, x:88, y:42, c:'pink', en:'Door', es:'Puerta',
      what:{en:'Salsas, condiments, chipotles once open',es:'Salsas, aderezos, chipotles ya abiertos'},
      why:{en:'The warmest spot, so it only holds things with salt, vinegar or sugar that protect them.',es:'Es el lugar más tibio, así que solo va lo que tiene sal, vinagre o azúcar que lo protege.'} }
  ]
};
