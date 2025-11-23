variable "rg_name" {
  type = string
  description = "Resource group name"
}

variable "vnet_name" {
  type = string
  description = "VNET name"
}

variable "location" {
  type = string
  description = "Location for the VNET"
}

variable "add_space" {
  type = list(string)
  description = "Address space for the VNET (How many IP addresses to have under this VNET)"
}

variable "subnet_name" {
  type = string
  description = "Subnet name"
}

variable "subnet_add_prefix" {
  type = list(string)
  description = "Address prefix for the subnet"
}

variable "aks_delegation_name" {
  type = string
  description = "Name for the delegation created for the subnet (This delegation gives AKS the permission to control IP allocation)"
}