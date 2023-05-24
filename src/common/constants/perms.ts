export enum AdministratorPerms {
  DeleteRole,

  // add
  AddRole,
  AddEnvolopeToUser,
  UpdateEnvelopeOfUser,
  // view tenants
  ListTenant,
  ViewTenantEmail,
  ViewTenantAddress,
  ViewTenantPhone,
  ViewTenantEnvelopes,
  ViewTenantTransactions,
  // update
  UpdateRole,
  UpdateTenantEmail,
  UpdateTenantAddress,
  UpdateTenantPhone,
  UpdateTenantEnvelopes,
  UpdateTenantTransactions,
  UpdateUserRole,
  // remove
  RemoveTenant,
  RemoveUser,
  // retrive
  RetriveTenant,
}

export enum TenantPerms {
  AddCategory,
  // category
  ListCategory,
  UpdateCategory,
  // productgs
  ListProduct,
  UpdateProduct,
  // Upload
  UpdateProductImg,
  RemoveProductImg,
  ListUser,
  ViewUserRole,
  ViewUserEmail,

  AddUserRole,
}
