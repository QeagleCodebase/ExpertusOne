import { Page, BrowserContext } from "@playwright/test";
import { AdminHomePage } from "./AdminHomePage";
import { th } from "@faker-js/faker";

export class CoursePage extends AdminHomePage {
    public selectors = {
        ...this.selectors,
        createUserLabel: "//h1[text()='Create Course']",
        courseDescriptionInput: "//div[@id='course-description']//p",
        uploadDiv: "//div[@id='upload-div']",
        uploadInput: "//div[@id='upload-div']//input[@id='content_upload_file']",
        attachedContent: (fileName: string) => `//label[text()='Attached Content']/following::div[text()='${fileName}']`,
        showInCatalogBtn: "//span[text()='Show in Catalog']",
        modifyTheAccessBtn: "//footer/following::button[text()='No, modify the access']",
        saveBtn: "//button[@id='course-btn-save' and text()='Save']",
        proceedBtn: "//footer//following::button[contains(text(),'Yes, Proceed')]",
        successMessage: "//div[@id='lms-overall-container']//h3",
        domainBtn: "//label[text()='Domain']/following::button[1]",
        domainOption: (domain_name: string) => `//div[@class='dropdown-menu show']//span[text()='${domain_name}']`,
        closeBtn: "//button[text()='Close']",
        courseLanguagesWrapper: "//label[contains(text(),'Language')]/following::div[@id='wrapper-course-languages']",
        courseLanguageInput: "//label[text()='Language']/following::input[1]",
        courseLanguageLink: (language: string) => `//label[text()='Language']//following::span[text()='${language}']`,
        selectCategoryBtn: "//div[@id='new-course-categorys']//div[text()='Select']",
        categoryOption: (category: string) => `//span[text()='${category}']`,
        addCategoryBtn: "//div[text()='Add Category']",
        categoryInput: "//label[text()='Category']/following::input[@id='course-categorys']",
        okBtn: "//label[text()='Category']/following::span[@class='lms-cat-ok']",
        cancelBtn: "//label[text()='Category']/following::span[contains(@class,'lms-cat-cancel')]",
        providerDropdown: "(//label[text()='Provider']/following::button)[1]",
        providerOption: (provider: string) => `//span[text()='${provider}']`,
        totalDurationInput: "(//label[text()='Total Duration']/following::input)[1]",
        additionalInfoInput: "//div[@id='additional_information_description_id']//p",
        priceInput: "//label[text()='Price']/following::input[1]",
        currencyDropdown: "//div[@id='wrapper-course-currency']",
        currencyOption: "//label[text()='Currency']/following::a/span[text()='US Dollar']",
        maxSeatsInput: "//label[text()='Seats-Max']/following::input[1]",
        contactSupportInput: "//label[text()='Contact Support']/following::input[1]",
        complianceField: "//div[@id='wrapper-course-compliance']",
        complianceOption: "//footer/following-sibling::div//span[text()='Yes']",
        validityField: "//div[@id='wrapper-course-compliance-validity']",
        validityOption: "//footer/following::span[text()='Days']",
        validityDateInput: "input[@id='validity_date-input']",
        validityDaysInput: "//input[@id='validity_days']",
        completeByField: "//div[@id='wrapper-course-complete-by']",
        completeByDaysInput: "//input[@id='complete_days']",
        postCompleteByStatusField: "//div[@id='wrapper-course-post-complete-by-status']",
        postCompleteByOption: "//footer/following::a/span[text()='Overdue']",
        courseInstancesField: "//div[@id='wrapper-course-instances']",
        instanceTypeOption: "//span[text()='Multi Instance/Class']",
        hideInCatalogCheckbox: "//span[contains(text(),'Hide in Catalog')]",
        saveInDraftCheckbox: "//span[contains(text(),'Save as Draft')]",
        deliveryTypeDropdown: "//div[@id='wrapper-course-delivery-type']",
        deliveryTypeOption: (deliveryType: string) => `//span[text()='${deliveryType}']`,
        editCourseTabLink: (tabName: string) => `//a[text()='${tabName}']`,
        addInstancesBtn: "//button[@id='course-btn-add-instances']",
        instanceDeliveryTypeField: "//div[@id='wrapper-instanceDeliveryType']",
        instanceDeliveryTypeOption: (delivery: string) => `//footer/following::a/span[text()='${delivery}']`,
        instanceCountInput: "//div[@id='exp-course-instances-options']//input",
        createInstanceBtn: "//button[@id='instance-add']",
        sessionNameInput: "//label[text()='Session Name']/following-sibling::input",
        instructorDropdown: "//label[text()='Instructor']/following-sibling::div//input",
        instructorOption: (instructorName: string) => `//li[contains(text(),'${instructorName}')]`,
        locationDropdown: "//label[text()='Select Location']/following-sibling::div//input",
        locationOption: (locationName: string) => `//li[contains(text(),'${locationName}')]`,
        startDateInput: "input[@name='startdate_0']",
        seatMaxInput: "//input[@id='course-seats-max']",
        timeInput: (time: string) => `//label[text()='${time}']/following-sibling::input`,
        chooseTimeOption: (chooseTime: string) => `//li[text()='${chooseTime}']`,
        waitlistInput: "//label[text()='Waitlist']/following-sibling::input",
        updateBtn: "//button[text()='Update']",
        detailsbtn: "//button[text()='Details']",
        courseUpdateBtn: "//button[@id='course-btn-save']",
        surveyAndAssessmentLink: "//button[text()='Survey/Assessment']",
        surveyCheckBox: "//div[@id='sur_ass-lms-scroll-survey-list']//i[contains(@class,'fa-duotone fa-square icon')]",
        editCourseBtn: "//a[text()='Edit Course']",
        assessmentCheckbox: "//div[@id='sur_ass-lms-scroll-assessment-list']//i[contains(@class,'fa-duotone fa-square icon')]",
        addAssessmentBtn: "//button[text()='Add As Assessment']",
    };

    constructor(page: Page, context: BrowserContext) {
        super(page, context,);
    }

    async verifyCreateUserLabel(expectedLabel: string) {
        await this.verification(this.selectors.createUserLabel, expectedLabel);
    }

    async typeDescription(data: string) {
        await this.type(this.selectors.courseDescriptionInput, "Description", data);
    }

    async upload() {
        const fileName = "samplevideo"
        const path = `../data/${fileName}.mp4`
        await this.mouseHover(this.selectors.uploadDiv, "upload");
        await this.uploadFile(this.selectors.uploadInput, path);
        await this.validateElementVisibility(this.selectors.attachedContent(fileName), fileName);
    }

    async clickCatalog() {
        await this.validateElementVisibility(this.selectors.showInCatalogBtn, "Show in Catalog");
        await this.click(this.selectors.showInCatalogBtn, "Catalog", "Button");
    }

    async clickSave() {
        await this.validateElementVisibility(this.selectors.saveBtn, 'Save');
        await this.click(this.selectors.saveBtn, "Save", "Button");
    }

    async clickProceed() {
        await this.validateElementVisibility(this.selectors.proceedBtn, "Proceed");
        await this.click(this.selectors.proceedBtn, "Proceed", "Button");
    }

    async verifyCourseCreationSuccessMessage() {
        await this.spinnerDisappear();
        await this.verification(this.selectors.successMessage, "successfully");
    }

    async selectDomain(domain_name: string) {
        await this.click(this.selectors.domainBtn, "Domain", "Button");
        await this.click(this.selectors.domainOption(domain_name), "Domain Name", "Button");
        await this.click(this.selectors.domainBtn, "Domain", "Button"); // Close domain dropdown if needed
    }

    async selectLanguage(language: string) {
        await this.click(this.selectors.courseLanguagesWrapper, "Language", "Field");
        await this.type(this.selectors.courseLanguageInput, "Input Field", language);
        await this.mouseHover(this.selectors.courseLanguageLink(language), language);
        await this.click(this.selectors.courseLanguageLink(language), language, "Button");

    }

    async clickSelect(category: string) {
        await this.click(this.selectors.selectCategoryBtn, "Category", "Dropdown");
        await this.click(this.selectors.categoryOption(category), "Category", "Dropdown");
    }

    async addCategory(CategoryName: string) {
        await this.click(this.selectors.addCategoryBtn, "Add category", "Field");
        await this.type(this.selectors.categoryInput, "Category", CategoryName);
    }

    async clickOk() {
        await this.click(this.selectors.okBtn, "Tick", "image");
    }


    async modifyTheAccess() {
        await this.mouseHover(this.selectors.modifyTheAccessBtn, "No, Modify The Access");
        await this.click(this.selectors.modifyTheAccessBtn, "No, Modify The Access", "Button");
    }
    async clickCancel() {
        await this.click(this.selectors.cancelBtn, "Cancel", "image");
    }

    async selectProvider(provider: string) {
        await this.click(this.selectors.providerDropdown, "Default Provider", "Dropdown Field");
        await this.click(this.selectors.providerOption(provider), "Provider", "Dropdown Value");
    }

    async selectTotalDuration(duration: string) {
        await this.typeAndEnter(this.selectors.totalDurationInput, "Duration", duration);
    }

    async typeAdditionalInfo(additionalInfo: string) {
        await this.type(this.selectors.additionalInfoInput, "Additional Information", additionalInfo);
    }

    async enterPrice(priceValue: string) {
        await this.type(this.selectors.priceInput, "Price", priceValue);
    }

    async selectCurrency() {
        await this.click(this.selectors.currencyDropdown, "Currency", "Field");
        await this.click(this.selectors.currencyOption, "Currency", "Selected");
    }

    async selectSeats(seatCount: string) {
        await this.type(this.selectors.maxSeatsInput, "Max-Seats", seatCount);
    }

    async contactSupport(email: string) {
        await this.type(this.selectors.contactSupportInput, "ContactSupport", email);
    }

    async selectCompliance() {
        await this.click(this.selectors.complianceField, "Compaliance", "Field");
        await this.click(this.selectors.complianceOption, "Compaliance", "Field");
    }

    async selectValidity() {
        await this.click(this.selectors.validityField, "Valitdity", "field");
        await this.click(this.selectors.validityOption, "Days", "Field");
    }

    async enterDate(date: string) {
        await this.type(this.selectors.validityDateInput, "Date ", date);
    }

    async daysOfValidity(days: string) {
        await this.type(this.selectors.validityDaysInput, "Days", days);
    }

    async selectCompleteBy() {
        await this.click(this.selectors.completeByField, "CompleteBy", "Field");
    }

    async selectDaysfromEnrollment() {
        await this.click(this.selectors.chooseTimeOption("Days from Enrollment"), "Days from Enrollment", "Dropdown");
    }

    async selectDaysfromHire() {
        await this.click(this.selectors.chooseTimeOption("Days from Hire"), "Days from Hire", "Dropdown");
    }

    async enterCompleteByDate(date: string) {
        await this.type(this.selectors.completeByField, "Choose Date", date);
    }

    async completByDays(days: string) {
        await this.type(this.selectors.completeByDaysInput, "ComplebyDays", days);
    }

    async selectPostCompletebyOverDue() {
        await this.click(this.selectors.postCompleteByStatusField, "Default Incomplete", "dropdown");
        await this.click(this.selectors.postCompleteByOption, "Overdue", "Option");
    }

    async selectInstance() {
        await this.click(this.selectors.courseInstancesField, "Default Single Instance", "dropdown");
        await this.click(this.selectors.instanceTypeOption, "Multi Instance", "Option");
    }

    async clickHideinCatalog() {
        await this.click(this.selectors.hideInCatalogCheckbox, "Hide in Catalog", "checkbox");
    }

    async clickSaveinDraft() {
        await this.click(this.selectors.saveInDraftCheckbox, "Save in Draft", "checkbox");
    }

    async selectdeliveryType(deliveryType: string) {
        await this.click(this.selectors.deliveryTypeDropdown, "Course Delivery", "dropdown");
        await this.click(this.selectors.deliveryTypeOption(deliveryType), "Delivery Type", "Selected");
    }

    async clickEditCourseTabs(data: string) {
        await this.click(this.selectors.editCourseTabLink(data), "Edit Course", "Button");
    }

    async addInstances() {
        await this.click(this.selectors.addInstancesBtn, "Add Instances", "Button");
    }

    async selectInstanceDeliveryType(delivery: string) {
        await this.click(this.selectors.instanceDeliveryTypeField, "Select Instance Type", "Option");
        await this.click(this.selectors.instanceDeliveryTypeOption(delivery), "Instance DeliveryType", "Option");
    }

    async enterInstanceCount(count: string) {
        await this.type(this.selectors.instanceCountInput, "Instance Count", count);
    }

    async clickCreateInstance() {
        await this.click(this.selectors.createInstanceBtn, "Create Instances", "Button");
    }

    async enterSessionName(sessionName: string) {
        await this.type(this.selectors.sessionNameInput, "Seesion Name", sessionName);
    }

    async selectInstructor(instructorName: string) {
        await this.click(this.selectors.instructorDropdown, "Select Instructor", "DropDown");
        await this.type(this.selectors.instructorDropdown, "Instructor Name", instructorName);
        await this.mouseHoverandClick(this.selectors.instructorOption(instructorName), this.selectors.instructorOption(instructorName), "Instructor Option", "Selected");
    }

    async selectLocation(locationName: string) {
        await this.click(this.selectors.locationDropdown, "Select Location", "DropDown");
        await this.type(this.selectors.locationDropdown, "Location", locationName);
        await this.mouseHoverandClick(this.selectors.locationOption(locationName), this.selectors.locationOption(locationName), "Location Option", "Selected");
    }

    async setDate(date: string) {
        await this.type(this.selectors.startDateInput, "Date", date);
    }

    async setMaxSeat(seatNum: string) {
        await this.typeAndEnter(this.selectors.seatMaxInput, "Instance Max Seat", seatNum);
    }

    async setTime(time: string, chooseTime: string) {
        await this.click(this.selectors.timeInput(time), "Time", time);
        await this.click(this.selectors.chooseTimeOption(chooseTime), "Choose Time", chooseTime);
    }

    async waitList() {
        await this.type(this.selectors.waitlistInput, "WaitList", "4");
    }

    async clickUpdate() {
        await this.click(this.selectors.updateBtn, "update", "field");
    }

    async save_editedcoursedetails() {

        await this.click(this.selectors.detailsbtn, "details", "button")
        await this.clickCatalog()
        await this.validateElementVisibility(this.selectors.courseUpdateBtn, "button")
        await this.click(this.selectors.courseUpdateBtn, "Update", "button")

    }

    async addsurvey_course() {
        await this.wait('minWait')
        await this.validateElementVisibility(this.selectors.surveyAndAssessmentLink, "Survey/Assessment")
        await this.click(this.selectors.surveyAndAssessmentLink, "Survey/Assessment", "Link")
        try {
            await this.page.waitForSelector("//span[text()='You have unsaved changes that will be lost if you wish to continue. Are you sure you want to continue?']", { state: 'visible', timeout: 20000 });
            await this.click("//button[text()='YES']", "yes", "button")
        } catch (error) {
            console.log("no unsaved dialog")
        }
        await this.click(this.selectors.surveyAndAssessmentLink, "Survey/Assessment", "button");
        await this.wait('mediumWait')
        const selector = this.page.locator(this.selectors.surveyCheckBox);
        const checkboxCount = await selector.count()
        const randomIndex = Math.floor(Math.random() * checkboxCount);
        await this.page.locator(this.selectors.surveyCheckBox).nth(randomIndex).click();
        //await this.click(this.selectors.surveyAndAssessmentLink.nth(randomIndex), "survey", "radiobutton");
        await this.click("//button[text()='Add As Survey']", "Addsurvey", "button");
        await this.wait('mediumWait')

    }

    async editcourse() {
        await this.click(this.selectors.editCourseBtn, "editcourse", "button")
    }

    async uploadPDF() {
        const fileName = "sample"
        const path = `../data/${fileName}.pdf`
        await this.mouseHover(this.selectors.uploadDiv, "upload")
        await this.uploadFile(this.selectors.uploadInput, path)
        await this.validateElementVisibility(this.selectors.attachedContent(fileName), fileName)
    }
    async addAssesment() {
        const selector = this.page.locator(this.selectors.assessmentCheckbox);
        const checkboxCount = await selector.count();
        if (checkboxCount < 2) {
            throw new Error("Not enough checkboxes to select two distinct ones");
        }
        const selectedIndices = new Set<number>();
        while (selectedIndices.size < 2) {
            const randomIndex = Math.floor(Math.random() * checkboxCount);
            selectedIndices.add(randomIndex);
        }
        for (const index of selectedIndices) {
            await selector.nth(index).click();
        }
        await this.click(this.selectors.addAssessmentBtn, "Addassesment", "button")
        await this.wait('maxWait')
    }
}
