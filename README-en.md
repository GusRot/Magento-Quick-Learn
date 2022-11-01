###  Version README [Portugues](./README.md)
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

## 📝 Project
Magento2: Presentation about UiComponents and KnockoutJS

### UiComponents

UiComponents are used to represent distinct UI elements such as tables, buttons, dialogs and others. They are designed for simple and flexible user interface (UI) rendering. They are also responsible for rendering results page fragments and providing/supporting additional JavaScript and server component interactions.

The Magento documentation recommends using UiComponents whenever possible as they tend to do the same in their codebase. (source): [https://devdocs.magento.com/guides/v2.4/ui_comp_guide/bk-ui_comps.html] (Overview of UI components).
if you're not sure whether to use Jquery or Ui Components, it's probably better to use UiComponents.

#### **Creating the Component**

The skeleton of a UIComponent requires the interaction of XML, PHTML and JS files. I will show you step by step in each of the files. Before that, you need to know which module you will work with, in this case, I will give an example of an application on the checkout page, located in the handle: **checkout_index_index** in the `Magento_Checkout` module.
To find and understand better about handles and how it works: https://developer.adobe.com/commerce/frontend-core/guide/layouts/

#### **XML - layout/checkout_index_index.xml**

Here we are going to add the UiComponent in the header of this page to simplify the explanation. In this case using the container `checkout.header.container`.
We must add a new block in this container, give it a name and assign a PHTML file as a template for this UIComponent.
This block must receive the argument with the sequence that will be explained in more detail after the example below:

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
*item name="(whatever name)" type="array"*  (I recommend using this same name for the files as well, so there is no confusion between files and blocks
)
*item name="component" type="string"* (this string indicates the path of the js file referring to the web folder)

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

`"Magento_Ui/js/core/app": <?= $block->getJsLayout() ?>` this snippet will know that magento needs to fetch the argument *name="jsLayout"* indicated in the XML.

`php /* @var $block Magento/Framework/View/Element/Template */ ?>` this snippet performs the typing of the block

I added a text to ensure that the PHTML is playing at the top of the page as expected.

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

            console.log('hello there');
        },
    });
});
~~~

Here we extend Magento's base component and the initialize function executes when its component is loaded on the page. If the message appears on your console, everything is ok :smiley:  

`this._super()` it is not necessary for this code, however it is recommended to use it to have access to the constructor functions and not suffer bugs. Just use it to not spend time to understand the reason of unwanted results. If you are not familiar with this concept, I recommend reviewing Object Oriented Programming.

#### **Adding variables to PHTML**

`defaults` brings variables that can be shared through data-bind to phtml, we will define data-bind in future examples.

JS:

~~~javascript
return Component.extend({
        defaults: {
            message: 'by defaults: hello there'
        },

        initialize: function () {
            this._super()

            console.log(this.message);
        },
    });
~~~

With the property `message` defined in defaults, we can display it on the screen too. In the PHTML file:

~~~html
<div class="quick-learn-banner-class" id="quick-learn-banner-id" data-bind="scope: 'quick-learn-banner'">
    <div data-bind='text: message'></div>
</div>
~~~

Instead of the text displayed in the previous example, the new message will be displayed “by defaults: hello there“.

**OBS:** *Remembering that we must always translate the texts when we are developing. But we won't focus on that in this example..*

### **Declaring knockout**

We will find the `knockout` alias as `ko` in Magento, to declare it we take advantage of our define already used in the previous session with the following code:

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

### **Initializing a ko template**

It is common to use `knockout` with a .html file and for that we need to add one more file to our project. For this, we need to add a property called template to the defaults object (very intuitive, right?).

~~~javascript
...
return Component.extend({

        defaults: {
            template: 'Magento_Checkout/quick-learn-banner',
            message: 'Hello there',
        },

        initialize: function () { 
        ...
        
    }})
~~~

I'm naming the file following the same pattern as the previous ones to make the code easier to understand. The directory of this template file refers to the folder *web/template*
Note the subtle difference in this folder **template** to the folder **templates** where we have our PHTML.

In addition, we need to call this template in PHTML as follows:

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

Note that the only change was the addition of a `ko` comment line.

If you are not familiar with this knockout nomenclature, I recommend taking a look at the official documentation: (https://knockoutjs.com/documentation/introduction.html).      *PS:   At first, these invocations through .html comments are scary, but you get the hang of it soon!*

#### **HTML - web/template/quick-learn-banner.html**

~~~html
<div>
  <span data-bind="text: message"></span>
</div>
~~~

Just this code snippet is enough for you to find the result on your screen. Congrats, your template has been created successfully!

### **ko.observables**

An observer automatically updates its interface when the view model changes, it reacts to changes according to its business rule. To use it, we will use the defaults object below: (If you know ReactJS and states, it will be easier to understand)

~~~javascript
...
return Component.extend({

        defaults: {
            template: 'Magento_Checkout/quick-learn-banner',
            message: ko.observable('Hello There'),
            subtotal: ko.observable(0),
            isVisible: ko.observable(false),
        },

        initialize: function () { 
        ...
    }})
~~~

Note that observables are like functions and to change their values ​​they must be done as such:

`this.message('Oi')`
`this.subtotal(10)`
`this.isVisible(true)`

To access the last observable value we have the property:

`this.message._lastValue`
`this.subtotal._lastValue`
`this.isVisible._lastValue`

or just call:

`this.message()`
`this.subtotal()`
`this.isVisible()`

### **data-bind**

There are several methods that we can use through `data-bind`, I will leave some examples below:

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

- `fadeVisible` - whether or not to display an element based on the dynamic value of the isVisible variable
- `value` - the input receives the value of the subtotal variable and when the user types something changing the input, subtotal will also be changed
- `i18n` - enables translation of declared text
- `enable` - will enable or disable the button according to the true or false value of isVisible

### **Adding properties by XML**

It is possible to change the property `message` that we declare in JS through XML itself with a `item config`, ex: ( *layout/checkout_index_index.xml* )

~~~xml
    <item name="config" xsi:type="array">
        <item name="message" xsi:type="number">100</item>
    </item>
~~~

This XML's message property will override the existing one in JS.
In case you have any doubts, below is the complete `item config` snippet

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

### **Alternative method to call a UiComponent**

We don't need to make the call exclusively through `XML`, we can call our component by `PHTML`, ex: ( *templates/quick-learn-banner.phtml* )

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

You should notice that it follows the same structure as the XML call. And in the same way we can pass a config through this JSON object, this way it allows us to pass PHP variables to our JS.

### ***Bonus:***

#### **Debbuging UiComponents**

We can debug the component through the browser console with require.

*`require('uiRegistry').get('quick-learn-banner')`  will return all properties available by UiComponents*

*`require('uiRegistry').get('quick-learn-banner').message()`   will return the value of the variable defined in defaults*

*`require('uiRegistry').get('quick-learn-banner').message = 'new Hello there'`  will change the value of the variable*

*`require('uiRegistry').get(uiItem => console.log(uiItem.name))`    will return the name of all UiComponents loaded on that page*