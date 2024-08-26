const LicenseModel = {
  user: { type: String, required: true },
  licenseKey: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
  expiresAt: { type: Date, required: true }
}

module.exports = {
  LicenseModel
}
