class PreviewForm extends BaseForm {
    header = '';
    subHeader = '';
    formClassName = 'qualifiedSharesForm';

    constructor(header, subHeader) {
        super();
        console.log("SMNLOG :: Constructor : qualifiedSharesForm");
        this.header = header;
        this.subHeader = subHeader;
    }

    getFormData() {
        return '';
    }

    getFormHtml() {
        var self = this;

        console.log(formObject.length);

        let html = '<div class="rounded border border-color d-flex flex-column ' + this.formClassName + '">'
        // html += super.getStepFormHeader(this.header);

        $.each(formObject, function(idx, formObject){
            html += formObject.getFormHtml(formObject.formClassName === 'companyNameForm');
        });
        return html;
    }

    bindEvents() {
        var self = this;

    }

    _getBaseElementForThisForm() {
        return $(document).find('div.' + this.formClassName);
    }

    _getDistrictElement() {
        return this._getBaseElementForThisForm().find('select.' + this.districtSelectBoxClassName);
    }

    _getUpazilaElement() {
        return this._getBaseElementForThisForm().find('select.' + this.upazilaSelectBoxClassName);
    }

    getEmptyJsonData() {
        return {}
    }
}