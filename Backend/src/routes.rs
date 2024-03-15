use actix_web::{delete, get, HttpResponse, post, put, web};

#[get("/list")]
async fn find_all() -> Result<HttpResponse, CustomError> {
    let employees = web::block(|| Employees::find_all()).await.unwrap();
    Ok(HttpResponse::Ok().json(employees))
}

#[get("/list/{id}")]
async fn find(id: web::Path) -> Result<HttpResponse, CustomError> {
    let employee = Employees::find(id.into_inner())?;
    Ok(HttpResponse::Ok().json(employee))
}

#[post("/list")]
async fn create(employee: web::Json) -> Result<HttpResponse, CustomError> {
    let employee = Employees::create(employee.into_inner())?;
    Ok(HttpResponse::Ok().json(employee))
}

#[put("/list/{id}")]
async fn update(
    id: web::Path,
    employee: web::Json,
) -> Result<HttpResponse, CustomError> {
    let employee = Employees::update(id.into_inner(), employee.into_inner())?;
    Ok(HttpResponse::Ok().json(employee))
}

#[delete("/list/{id}")]
async fn delete(id: web::Path) -> Result<HttpResponse, CustomError> {
    let deleted_employee = Employees::delete(id.into_inner())?;
    Ok(HttpResponse::Ok().json(json!({ "deleted": deleted_employee })))
}

pub fn init_routes(config: &mut web::ServiceConfig) {
    config.service(find_all);
    config.service(find);
    config.service(create);
    config.service(update);
    config.service(delete);
}