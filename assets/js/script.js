document.body.addEventListener('click', function (e) { if (!e.target.classList.contains('play_video')) return false; e.preventDefault(); alert('Show Video'); });
(function (e) { var matches = e.matches || e.matchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector; !matches ? (e.matches = e.matchesSelector = function matches(selector) { var matches = document.querySelectorAll(selector); var th = this; return Array.prototype.some.call(matches, function (e) { return e === th; }); }) : (e.matches = e.matchesSelector = matches); })(Element.prototype);
(function (e) { e.closest = e.closest || function (css) { var node = this; while (node) { if (node.matches(css)) return node; else node = node.parentElement; } return null; } })(Element.prototype);
(function () { var throttle = function (type, name, obj) { obj = obj || window; var running = false; var func = function () { if (running) { return; } running = true; requestAnimationFrame(function () { obj.dispatchEvent(new CustomEvent(name)); running = false; }); }; obj.addEventListener(type, func); }; throttle("resize", "optimizedResize"); })();
function getWaysTabsItemsFromDataTab(targetElement, ways) {
    if (!ways) ways = targetElement.closest('.ways');
    let dataTab = targetElement.getAttribute('data-tab'),
        waysTabsCaptionItem = ways.querySelector('.ways_tabs_caption_item[data-tab=' + dataTab + ']'),
        waysTabsContentItem = ways.querySelector('.ways_tabs_content_item[data-tab=' + dataTab + ']');

    return {
        dataTab: dataTab,
        caption: waysTabsCaptionItem,
        content: waysTabsContentItem
    }
}
function waysPreviewHideToggle(target, hide = false) {
    if (!target) return false;
    let ways = target.closest('.ways'),
        waysPreview = ways.querySelector('.ways_preview'),
        activeItems = ways.querySelectorAll('.active');

    if (hide) {
        waysPreview.classList.add('hide');
    } else {
        waysPreview.classList.remove('hide');
    }

    for (let i = 0; i < activeItems.length; i++) {
        activeItems[i].classList.remove('active');
    }

}
function waysTabsActiveTogle(targetElement, ways) {
    if (!ways) ways = targetElement.closest('.ways');

    let waysTabs = ways.querySelector('.ways_tabs'),
        waysTabsContent = waysTabs.querySelector('.ways_tabs_content'),
        waysTabsCaption = waysTabs.querySelector('.ways_tabs_caption'),
        obj = getWaysTabsItemsFromDataTab(targetElement);

    if (waysTabsContent.querySelector('.ways_tabs_content_item.active')) {
        waysTabsContent.querySelector('.ways_tabs_content_item.active').classList.remove('active');
        waysTabsCaption.querySelector('.ways_tabs_caption_item.active').classList.remove('active');
    }

    if (obj.caption && obj.content) {
        obj.caption.classList.add('active');
        obj.content.classList.add('active');
    };
}
function toggleAccordeon(targetItemCaption) {
    let targetAccordionItem = targetItemCaption.closest('.accordion_item'),
        accordion = targetAccordionItem.closest('.accordion'),
        targetContent = targetAccordionItem.querySelector('.accordion_item_content'),
        activeAccordionItem = accordion.querySelector('.accordion_item.active');

    let h = targetContent.scrollHeight + 'px';
    targetContent.style.height = h;

    if (targetAccordionItem === activeAccordionItem) {
        targetAccordionItem.classList.remove('active');
        waysPreviewHideToggle(targetItemCaption, false);
        targetContent.style.height = '0px';
    } else {
        if (activeAccordionItem) {
            let activeContent = activeAccordionItem.querySelector('.accordion_item_content');
            activeAccordionItem.classList.remove('active');
            activeContent.style.height = '0px';
        };

        waysPreviewHideToggle(targetItemCaption, true);

        targetAccordionItem.classList.add('active');
    }
}
document.querySelector('.ways').addEventListener('click', function (e) {
    let targetElement = e.target.closest('.ways_preview_item_inner');

    if (!targetElement) return false;

    waysPreviewHideToggle(e.target, true);
    waysTabsActiveTogle(targetElement);
});
document.querySelector('.ways_tabs_caption').addEventListener('click', function (e) {
    let targetElement = e.target.closest('.ways_tabs_caption_item');

    if (!targetElement) return false

    waysTabsActiveTogle(targetElement);
});
document.addEventListener('click', function (e) {
    let targetItemCaption = e.target.closest('.accordion_item_caption');

    if (!targetItemCaption) return false;

    toggleAccordeon(targetItemCaption);
    getWaysTabsItemsFromDataTab(targetItemCaption.closest('.accordion_item')).caption.classList.add('active');
});
window.addEventListener('optimizedResize', function () {
    document.body.classList.add('resizing');
    let els = document.querySelectorAll('.accordion_item .accordion_item_content');

    for (let i = 0; i < els.length; i++) {
        if (els[i].closest('.accordion_item.active')){
            els[i].style.height = els[i].scrollHeight + 'px';
        } else {
            els[i].style.height = '0px'
        }
    }

    setTimeout(function () {
        document.body.classList.remove('resizing')
    }, 100);

})
