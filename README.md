###  Version README [English](./README-en.md)
<div style="display: flex; gap:1rem;">
<a href="#">
<img alt="Repository size" src="https://img.shields.io/github/repo-size/GusRot/Magento-Quick-Learn">
</a>
<a href="#">
<img alt="GitHub language count" src="https://img.shields.io/github/languages/count/GusRot/Magento-Quick-Learn?color=%2304D361">
</a>
<a href="#">
<img alt="Wakatime" src="https://wakatime.com/badge/user/04f1420e-9d57-410a-bdc7-d768fb237a52/project/13294ba1-a531-4fe1-a5d0-0ea4480daa77.svg">
</a>
<a href="https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt" target="blank">
<img alt="LicenseMIT" src="https://badgen.net/github/license/micromatch/micromatch">
</a>
</div>

## 📝 O Projeto
Apresentação de conteúdo de Magento sobre UiComponents e KnockoutJS

### Conteúdo:

UiComponents são usados ​​para representar elementos distintos da interface do usuário, como tabelas, botões, diálogos e outros. Eles são projetados para renderização de interface de usuário (UI) simples e flexível. Os componentes são responsáveis ​​por renderizar fragmentos de página de resultados e fornecer/suportar interações adicionais de componentes JavaScript e servidor.

A documentação do Magento recomenda o uso de UiComponents sempre que possível, pois tendem a fazer o mesmo em seu código base. (fonte): [https://devdocs.magento.com/guides/v2.4/ui_comp_guide/bk-ui_comps.html] (Overview of UI components)
Se voce está com dúvida em usar Jquery ou Ui Components, provavelmente será melhor usar UiComponents

#### **Criando o Componente**

O esqueleto de um UIComponente exige a comunicação de arquivos XML, PHTML e JS. Vou mostrar a seguir o passo a passo em cada um dos arquivos. Antes disso, você precisa saber qual o módulo que você irá trabalhar, neste caso, irei dar o exemplo de uma aplicação na página de checkout, localizado na handle: **checkout_index_index** no módulo `Magento_Checkout`. 
Para encontrar a handle ou entender como funciona, recomendo este artigo: (https://calazanslucas.medium.com/magento-2-guia-de-sobrevivencia-no-frontend-parte-1-76fe6d2ffe4e)

#### **XML - layout/checkout_index_index.xml**

Vamos inserir o UiComponent no header desta página para simplificar a explicação. Neste caso utilizando o container `checkout.header.container`.
Devemos inserir um novo bloco neste container, dar um nome e atribuir um arquivo PHTML como template para este UIComponent.
Este bloco deve receber o argumento com a sequencia que será explicada com mais detalhes após o exemplo: 
Segue o código demonstrado abaixo para exemplificar:

~~~xml
<?xml version="1.0"?>
<page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" layout="checkout" xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd">
    <body>
        <referenceContainer name="checkout.header.container">
            <block name="quick.learn.banner" template="Magento_Checkout::quick-learn-banner.phtml" before="-">
                <arguments>
                    <argument name="jsLayout" xsi:type="array">
                        <item name="components" xsi:type="array">
                            <item name="quick-learn-banner" xsi:type="array">
                                <item name="component" xsi:type="string">Magento_Checkout/js/quick-learn-banner</item>
                            </item>
                        </item>
                    </argument>
                </arguments>
            </block>
        </referenceContainer>
    </body>
</page>
~~~

*argument name="jsLayout" type="array”*
*item name="components" type="array"*
*item name="(O nome que voce deseja atribuir)" type="array"*  (Recomendo utilizar este nome para os arquivos também para não haver confusão com nomenclatura entre arquivos e blocos)
*item name="component" type="string"* (esta string indica o caminho do arquivo js referente a pasta web)

#### PHTML - templates/quick-learn-banner.phtml

~~~php
<?php
/* @var $block Magento/Framework/View/Element/Template */
?>

<div class="quick-learn-banner-class" id="quick-learn-banner-id" data-bind="scope: 'quick-learn-banner'">
    texto de teste
</div>

<script type="text/x-magento-init">
    {
        "#quick-learn-banner-id": {
            "Magento_Ui/js/core/app": <?= $block->getJsLayout() ?>
        }
    }
</script>
~~~

`"Magento_Ui/js/core/app": <?= $block->getJsLayout() ?>` este trecho vai saber que o magento precisa buscar o argument *name="jsLayout"* indicado no XML.

`php /* @var $block Magento/Framework/View/Element/Template */ ?>` este trecho realiza a tipagem do block

Adicionei um texto de teste para garantir que o PHTML está sendo reproduzido no topo pagina como esperado.

#### JS - web/js/quick-learn-banner.js

~~~javascript
define([
    'uiComponent'
    ], function (
    Component
    )   {
    "use strict";

    return Component.extend({

        initialize: function () {
            this._super()

            console.log('ola');
        },
    });
});
~~~

Aqui estendemos o componente base do Magento e a função initialize executa quando seu componente for carregado na página. Se a mensagem aparecer no seu console, está tudo certo :smiley:  

`this._super()` não é necessário para este código, porém é recomendado utilizar para ter acesso as funções do construtor e não sofrer bugs e gastar tempo sem entender o motivo. Caso não conheça este conceito, recomendo revisar Programação Orientada a Objeto.

#### **Adicionando variáveis ao PHTML**

O `defaults` trás variáveis que podem ser compartilhados por data-bind para o phtml.

No seu JS:

~~~javascript
return Component.extend({
        defaults: {
            message: 'ola por defaults'
        },

        initialize: function () {
            this._super()

            console.log(this.message);
        },
    });
~~~

Com a propriedade `message` definida no defaults, podemos exibir ela na tela. No arquivo PHTML:

~~~html
<div class="quick-learn-banner-class" id="quick-learn-banner-id" data-bind="scope: 'quick-learn-banner'">
    <div data-bind='text: message'></div>
</div>
~~~

Ao invés do texto teste exibido no exemplo anterior, será exibido a nova mensagem “ola por defaults“.

**OBS:** *Lembrando que devemos traduzir os textos quando estamos desenvolvendo. Mas não iremos focar nisso neste exemplo.*

### **Declarando knockout**

Iremos encontrar o `knockout` apenas como `ko` no Magento, para declará-lo aproveitamos nosso define já utilizado na sessão anterior com o seguinte código:

~~~javascript
define([
    'uiComponent',
    'ko'
    ], function (
    Component,
    ko
    )   {
    "use strict";

    return Component.extend({ ... })

    })
~~~

### **Inicializando um ko template**

É comum utilizarmos `knockout` com um arquivo .html e para isso precisamos adicionar mais um arquivo para o nosso projeto. Para isso, precisamos adicionar no objeto defaults uma propriedade chamada template(bem intuitivo né).

~~~javascript
...
return Component.extend({

        defaults: {
            template: 'Magento_Checkout/quick-learn-banner',
            message: 'Ola',
        },

        initialize: function () { 
        ...
        
    }})
~~~

Estou nomeando o arquivo seguindo o mesmo padrão dos anteriores para facilitar o entendimento do código. O diretório deste arquivo é referente a pasta *web/template* 
Note a sutil diferença desta pasta **template** para a pasta **templates** em que armazenamos nosso PHTML

Além disso precisamos chamar este template no PHTML da seguinte forma:

~~~php
<?php
/* @var $block Magento/Framework/View/Element/Template */
?>

<div class="quick-learn-banner-class" id="quick-learn-banner-id" data-bind="scope: 'quick-learn-banner'">
    <!-- ko template: getTemplate() --> <!-- /ko -->
</div>

<script type="text/x-magento-init">
    {
    "#quick-learn-banner-id": {
        "Magento_Ui/js/core/app": <?= $block->getJsLayout() ?>
        }
    }
</script>
~~~

Note que a única alteração foi a adição de uma linha de comentário `ko`.

Se você não está familiarizado com está nomenclatura do knockout, recomendo dar uma olhada na documentação oficial: (https://knockoutjs.com/documentation/introduction.html).      *PS:   No começo essas invocações através de comentário .html assustam, mas você pega o jeito logo!*

#### **HTML - web/template/quick-learn-banner.html**

~~~html
<div>
  <span data-bind="text: message"></span>
</div>
~~~

Apenas este trecho de código já é o suficiente para você encontrar o resultado na sua tela. Seu template foi criado com sucesso!

### **ko.observables**

Um observador atualiza sua interface automaticamente quando a view model se altera, ou seja, ele reage a mudanças de acordo com a sua regra de negócio. Para utilizá-lo iremos aproveitar o objeto defaults abaixo:

~~~javascript
...
return Component.extend({

        defaults: {
            template: 'Magento_Checkout/quick-learn-banner',
            message: ko.observable('Ola'),
            subtotal: ko.observable(0),
            isVisible: ko.observable(false),
        },

        initialize: function () { 
        ...
    }})
~~~

Note que os observables são como funções e para alterar seus valores devem ser feitos como tal:

`this.message('Oi')`
`this.subtotal(10)`
`this.isVisible(true)`

Para acessar o último valor do observable temos a propriedade:

`this.message._lastValue`
`this.subtotal._lastValue`
`this.isVisible._lastValue`

### **data-bind**

Existem diversos métodos que podemos utilizar através do `data-bind`, vou deixar alguns exemplos abaixo:

~~~html
    <div data-bind="fadeVisible: isVisible"> 
        <input type="text" class="my-style" data-bind="value: subtotal">
    </div>

    <!-- ko if: !isVisible -->
        <input type="text" class="my-style" data-bind="value: subtotal">
    <!-- /ko -->

    <div class="primary continue">
        <button class="action primary" data-bind="enable: isVisible, i18n: 'Next'" disabled />
    </div>
~~~

#### **Bindings:**

- `fadeVisible` - exibe ou não um elemento baseado no valor dinamico da variável isVisible
- `value` - o input recebe o value da variável subtotal e quando o usuário digitar algo alterando o input, subtotal também será alterado
- `i18n` - habilita a tradução do texto declarado 
- `enable` - vai ativar ou desativar o botão de acordo com o valor verdadeiro ou falso de isVisible

### **Adicionando propriedades por XML**

É possível alterar a propriedade `message` que declaramos no JS através do próprio XML com um `item config`, ex: ( *layout/checkout_index_index.xml* )

~~~xml
    <item name="config" xsi:type="array">
        <item name="message" xsi:type="number">100</item>
    </item>
~~~

Este a propriedade message do XML irá sobrescrever a existente no JS.
Caso tenha ficado alguma dúvida, abaixo está o exemplo completo utilizando o `item config`

~~~xml
    <block name="quick.learn.banner" template="Magento_Checkout::quick-learn-banner.phtml" before="-">
        <arguments>
            <argument name="jsLayout" xsi:type="array">
                <item name="components" xsi:type="array">
                    <item name="quick-learn-banner" xsi:type="array">
                        <item name="component" xsi:type="string">Magento_Checkout/js/quick-learn-banner</item>
                        <item name="config" xsi:type="array">
                            <item name="message" xsi:type="number">100</item>
                        </item>
                    </item>
                </item>
            </argument>
        </arguments>
    </block>
~~~

### **Alternativa para invocar um UiComponent**

Não precisamos fazer a chamada exclusivamente pelo `XML`, podemos chamar o nosso componente pelo `PHTML` desta forma: ( *templates/quick-learn-banner.phtml* )

~~~javascript
<script type="text/x-magento-init">  
  {
	"#quick-learn-banner-id": {
	    "Magento_Ui/js/core/app": {
			"components": {
			    "quick-learn-banner": {
			        "component": "Magento_Checkout/js/quick-learn-banner",
					"config": {
                        "test": "<?= $test ?>"
                    }
		    	}
			}
	    }
	}
  }
</script>
~~~

Você deve perceber que segue a mesma estrutura que a chamada pelo XML. E da mesma forma podemos passar uma config por esse objeto JSON, desta forma isso nos permite passar variáveis PHP para o nosso JS.

### ***Extras:***
#### **Palavra reservada `this`**

Note que para chamar o console.log do exemplo anterior precisamos desta palavra ‘this’ antes de evocar a propriedade message, isto é algo simples para quem está familiarizado com POO - Programação Orientada a Objetos, mas pode se tornar uma dificuldade para quem não conhece bem o assunto. 

Saiba que você precisará deste conceito para avançar com UiComponents e as chamadas às funções e objetos são feitas desta forma.

#### **Debbuging UiComponents**

Podemos debbugar o componente através do console do navegador com o require.

*`require('uiRegistry').get('quick-learn-banner')`  vai retornar todas as propriedades disponíveis por UiComponents*

*`require('uiRegistry').get('quick-learn-banner').message()`   vai retornar o valor da variável definida no defaults*

*`require('uiRegistry').get('quick-learn-banner').message = 'mudei o texto'`  vai alterar o valor da variável*

*`require('uiRegistry').get(uiItem => console.log(uiItem.name))`    vai retornar o nome de todos os UiComponents carregados naquela página*