class AoaForm extends BaseForm {
    aoaList = [];
    aoaTypeList = [{'id': 'MODEL', 'name': 'Model'}, {'id': 'CUSTOM', 'name': 'Custom'}, {'id': 'PRE_APPROVED', 'name': 'Pre-Approved'}];
    header = '';
    subHeader = '';
    formClassName = 'aoaFormForm';

    constructor(header, subHeader, aoaList) {
        super();
        console.log("SMNLOG :: Constructor : AoAForm");
        this.header = header;
        this.subHeader = subHeader;
        this.aoaList = aoaList;
    }

    getFormData() {
        return '';
    }

    getFormHtml() {
        var self = this;
        let html = '<div class="rounded border border-color d-flex flex-column ' + this.formClassName + '">'
        html += super.getStepFormHeader(this.header);

        html += '    <div class="col-md-12 p-4">'
            + '         <div class="col-md-6 offset-md-3">'
            + '             <div class="d-flex flex-column mb-4">'
            + '                 <label class="form-label font-label">1. AOA Type <span class="red">*</span></label>'
            +                   Obrs.APP.getCommonSelectBox(this.aoaTypeList, 'aoaTypeSelect', '')
            + '             </div>'
            + '         </div>'

            + '          <div class="py-4 px-120 shadow bg-white customAoaWrapperDiv" style="display: none;">'
            + '            <div class="row">'
            + '              <div class="col-md-12">'
            + '                <div'
            + '                  class="font-weight-bold text-center justify-content-center light-black mb-5">'
            + '                  THE COMPANIES ACT, 1994 ( ACT XVIII OF 1994 ) ( A PRIVATE'
            + '                  COMPANY LIMITED BY SHARES ) MEMORANDUM OF ASSOCIATION'
            + '                </div>'
            + '              </div>'
            + '            </div>'

            + '     <div class="row col-md-12 p-4">'
            + '       <div class="col-md-3"></div>'
            + '        <div class="col-md-6">'
            + '        <div class="col-md-12">'
            + '             <div class="row col-md-12 mb-1">'
            + '                 <div class="col-md-4">1. Name of the entity : </div>'
            + '                 <div class="col-md-8 font-weight-bold sectionLabel">Khudra Soft Ltd.</div>'
            + '             </div>'
            + '         </div>'
            + '         <div class="col-md-12">'
            + '             <div class="row col-md-12 mb-1">'
            + '                 <div class="col-md-4">2. Entity Type : </div>'
            + '                 <div class="col-md-8 font-weight-bold divisionLabel">Private Limited Company</div>'
            + '             </div>'
            + '         </div>'
            + '         <div class="col-md-12">'
            + '             <div class="row col-md-12 mb-1">'
            + '                 <div class="col-md-4">3. RJSC Office : </div>'
            + '                 <div class="col-md-8 font-weight-bold groupLabel">Dhaka</div>'
            + '             </div>'
            + '         </div>'
            + '         </div>'
            + '       <div class="col-md-3"></div>'
            + '      </div>';

        $.each(this.aoaList, function (idx, item) {
            html += self._createCommentSection(idx + 1, item, false);
        });

        html += self._createCommentSection(0, {}, true);

        html += '   <div class="container-fluid bg-white shadow-top px-120 py-3">'
            + '      <div class="row mx-0">'
            + '        <div class="col-md-12">'
            + '          <div class="d-flex justify-content-between">'
            + '            <div class="">You have to write (25) clause to generate MoA</div>'
            + '            <div class="bg-secondary p-2 text-white font-label">'
            + '              Write (23) more to generate MoA'
            + '            </div>'
            + '          </div>'
            + '        </div>'
            + '      </div>'
            + '    </div>'
            + '  </div>'

            + '      <div class="py-4 px-120 shadow bg-white modelAoaWrapperDiv text-align-center rounded border" style="display: none;">'
            + '      <img src="/images/sampleAoa/aoa-01.png" class="aoaImg"/>'
            + '      <img src="/images/sampleAoa/aoa-0222.png" class="aoaImg"/>'
            + '      <img src="/images/sampleAoa/aoa-03.png" class="aoaImg"/>'
            + '      <img src="/images/sampleAoa/aoa-04.png" class="aoaImg"/>'
            + '      <img src="/images/sampleAoa/aoa-05.png" class="aoaImg"/>'
            + '      <img src="/images/sampleAoa/aoa-06.png" class="aoaImg"/>'
            + '      <img src="/images/sampleAoa/aoa-07.png" class="aoaImg"/>'
            + '      <img src="/images/sampleAoa/aoa-08.png" class="aoaImg"/>'
            + '      <img src="/images/sampleAoa/aoa-09.png" class="aoaImg" style="margin-left: 2px;"/>'
            + '      <img src="/images/sampleAoa/aoa-10.png" class="aoaImg"/>'
            + '      <img src="/images/sampleAoa/aoa-11.png" class="aoaImg"/>'
            + '      <img src="/images/sampleAoa/aoa-12.png" class="aoaImg"/>'
            + '      <img src="/images/sampleAoa/aoa-13.png" class="aoaImg"/>'
            + '      <img src="/images/sampleAoa/aoa-14.png" class="aoaImg"/>'
            + '      <img src="/images/sampleAoa/aoa-15.png" class="aoaImg"/>'
            + '      <img src="/images/sampleAoa/aoa-16.png" class="aoaImg"/>'
            + '      <img src="/images/sampleAoa/aoa-17.png" class="aoaImg"/>'
            + '      <img src="/images/sampleAoa/aoa-18.png" class="aoaImg"/>'
            + '      <img src="/images/sampleAoa/aoa-19.png" class="aoaImg"/>'
            + '      <img src="/images/sampleAoa/aoa-20.png" class="aoaImg"/>'
            + '      <img src="/images/sampleAoa/aoa-21.png" class="aoaImg"/>'
            + '      <img src="/images/sampleAoa/aoa-22.png" class="aoaImg"/>'
            + '      <img src="/images/sampleAoa/aoa-23.png" class="aoaImg"/>'
            + '      <img src="/images/sampleAoa/aoa-24.png" class="aoaImg"/>'
            + '      <img src="/images/sampleAoa/aoa-25.png" class="aoaImg"/>'
            + '      <img src="/images/sampleAoa/aoa-26.png" class="aoaImg"/>'
            + '      </div>'

            + '      <div class="py-4 px-120 shadow bg-white preApprovedAoaWrapperDiv" style="display: none;">'
            + '         <div class="col-md-6 offset-md-3">'
            + '             <div class="d-flex flex-column mb-4">'
            + '                 <label class="form-label font-label">Upload Pre approved AOA <span class="red">*</span></label>'
            + '                 <input type="file" class="form-control preApprovedAoaFile" placeholder="Upload your pre approved Aoa ">'
            + '             </div>'
            + '         </div>'

            + '         <div class="m-3 p-2 rounded border previewImgDiv text-align-center" style="display: none;">'
            + '               <img src="#" class="preApprovedAoaImgPreview w-100">'
            + '         </div>'
            + '      </div>'
            + ' </div>'
            + '</div>';

        return html;
    }

    bindEvents() {
        var self = this;

        ClassicEditor.create(document.querySelector(".editor"))
            .then((editor) => {
                console.log(editor);
            })
            .catch((error) => {
                console.error(error);
            });

        $(document).on('click', '.aoaClauseEditBtn', function () {
            $(this)
                .closest('div.aoaClauseWrapper')
                .find('div.viewPanel')
                .hide()

            $(this)
                .closest('div.aoaClauseWrapper')
                .find('div.editorPanel')
                .show()
        });

        $(document).on('click', '.updateAoaClauseBtn', function () {
            $(this)
                .closest('div.aoaClauseWrapper')
                .find('div.viewPanel')
                .show()

            $(this)
                .closest('div.aoaClauseWrapper')
                .find('div.editorPanel')
                .hide()
        });

        $(document).on('change', '.aoaTypeSelect', function () {


            if($(this).val() === 'CUSTOM'){
                self._getElementByClass('customAoaWrapperDiv').show();
                self._getElementByClass('preApprovedAoaWrapperDiv').hide();
                self._getElementByClass('modelAoaWrapperDiv').hide();
            }else if($(this).val() === 'MODEL'){
                self._getElementByClass('modelAoaWrapperDiv').show();
                self._getElementByClass('customAoaWrapperDiv').hide();
                self._getElementByClass('preApprovedAoaWrapperDiv').hide();
            }else if($(this).val() === 'PRE_APPROVED'){
                self._getElementByClass('preApprovedAoaWrapperDiv').show();
                self._getElementByClass('customAoaWrapperDiv').hide();
                self._getElementByClass('modelAoaWrapperDiv').hide();
            }
        });

        $(document).on('change', '.preApprovedAoaFile', function (e) {
            console.log("SMNLOG :: File Changed...");
            self._getElementByClass('preApprovedAoaImgPreview').attr('src', URL.createObjectURL(e.target.files[0]));
            self._getElementByClass('previewImgDiv').show();
        });
    }

    _createCommentSection(idx, obj, isDefault) {
        let html = '  <div class="row p-4 pt-2 pb-1 aoaClauseWrapper">'
            + '          <div class="col-md-12">'
            + '             <div class="main-body-color custom-radius flex-column px-4 py-1 border-color viewPanel" style="display: '+ (isDefault === true ? "none": "block") +'">'
            + '                <div class="d-flex justify-content-between">'
            + '                  <div class="d-flex font-weight-bold">' + idx + ' ' + obj.title + '</div>'
            + '                  <div class="d-flex">'
            + '                      <button type="button" class="btn bg-white py-2 px-3 text-primary shadow d-flex gap-2 align-items-center aoaClauseEditBtn">'
            + '                        <i class="fa-solid fa-pen-to-square" style="color: #1952f4"></i>Edit'
            + '                      </button>'
            + '                  </div>'
            + '                </div>'
            + '                <div class="d-flex">' + obj.aoaClause + '</div>'
            + '            </div>'
            + '            <div class="flex-column light-blue-background custom-radius p-3 editorPanel" style="display: '+ (isDefault === false ?  "none": "block") +'">'
            + '                 <div class="font-weight-bold">Choose clause</div>'
            + '                 <input type="text" class="form-control mb-3" id="exampleFormControlInput1" placeholder="Disassembly and Recycling"/>'
            + '                 <div class="mb-3 editor">This is some sample content.</div>'
            + '                 <div class="d-flex justify-content-end mt-4">'
            + '                    <button type="button" class="btn btn-primary updateAoaClauseBtn">Update clause</button>'
            + '                 </div>'
            + '           </div>'

            + '        </div>'
            + '      </div>'
        return html;
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

    _getElementByClass(className){
        return this._getBaseElementForThisForm().find('.' + className);
    }

    getEmptyJsonData() {
        return {}
    }

}