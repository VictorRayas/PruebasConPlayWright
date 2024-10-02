const {test, sxpect, expect}= require("@playwright/test")

test('SuccesfullLoginWithCorrectCredentials', async({page})=>{
    await page.goto("https://managit-milenio-dev.azurewebsites.net/site/login")
    await page.locator('input[name="LoginForm[email]"]').fill('Supervisor@yopmail.com')
    await page.locator('input[name="LoginForm[password]"]').fill('Julio2022!')
    await page.click('button.btn.btn-info');
    await page.pause('')
})


test('LoginFailsOnWrongUsernameAndPassword', async({page})=>{
    await page.goto("https://managit-milenio-dev.azurewebsites.net/site/login")
    await page.locator('input[name="LoginForm[email]"]').fill('UserInvalid')
    await page.locator('input[name="LoginForm[password]"]').fill('password')
    await page.click('button.btn.btn-info');
    //Espera de Alerta 
    const alertLocator = page.locator('#w0-error-0');
    await alertLocator.waitFor();

    //Verificación del texto
    const alertMessage = await alertLocator.textContent()
    expect(alertMessage).toContain('email o Contraseña Incorrecta')
})

test('LoginFailsOnWrongUsername', async({page})=>{
    await page.goto("https://managit-milenio-dev.azurewebsites.net/site/login")
    await page.locator('input[name="LoginForm[email]"]').fill('UserInvalid')
    await page.locator('input[name="LoginForm[password]"]').fill('Julio2022!')
    await page.click('button.btn.btn-info');
    //Espera de Alerta 
    const alertLocator = page.locator('#w0-error-0');
    await alertLocator.waitFor();

    //Verificación del texto
    const alertMessage = await alertLocator.textContent()
    expect(alertMessage).toContain('email o Contraseña Incorrecta')
})

test('LoginFailsOnWrongPassword', async({page})=>{
    await page.goto("https://managit-milenio-dev.azurewebsites.net/site/login")
    await page.locator('input[name="LoginForm[email]"]').fill('Supervisor@yopmail.com')
    await page.locator('input[name="LoginForm[password]"]').fill('PasswordInvalid!')
    await page.click('button.btn.btn-info');
    //Espera de Alerta 
    const alertLocator = page.locator('#w0-error-0');
    await alertLocator.waitFor();

    //Verificación del texto
    const alertMessage = await alertLocator.textContent()
    expect(alertMessage).toContain('email o Contraseña Incorrecta')
})

test('RedirectionSuccess', async({page})=>{
    await page.goto("https://managit-milenio-dev.azurewebsites.net/site/login")
    await page.locator('input[name="LoginForm[email]"]').fill('Supervisor@yopmail.com')
    await page.locator('input[name="LoginForm[password]"]').fill('Julio2022!')
    await page.click('button.btn.btn-info');

    //Redireccionamiento
    await page.waitForURL('https://managit-milenio-dev.azurewebsites.net/site/dashboard')
    expect(page.url()).toBe('https://managit-milenio-dev.azurewebsites.net/site/dashboard');
})

test('RedirectionSuccessWithCheckboxSelected', async({page})=>{
    await page.goto("https://managit-milenio-dev.azurewebsites.net/site/login")
    await page.locator('input[name="LoginForm[email]"]').fill('Supervisor@yopmail.com')
    await page.locator('input[name="LoginForm[password]"]').fill('Julio2022!')
    
   
    await page.evaluate(() => {
        document.querySelector('#checkbox-signup').click();
      });



    
    await page.click('button.btn.btn-info');

    //Redireccionamiento
    await page.waitForURL('https://managit-milenio-dev.azurewebsites.net/site/dashboard')
    expect(page.url()).toBe('https://managit-milenio-dev.azurewebsites.net/site/dashboard');
})



