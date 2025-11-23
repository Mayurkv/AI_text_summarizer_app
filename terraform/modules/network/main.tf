resource "azurerm_virtual_network" "vnet" {
  name = var.vnet_name
  resource_group_name = var.rg_name
  location = var.location
  address_space = var.add_space
}

resource "azurerm_subnet" "subnet" {
  name = var.subnet_name
  resource_group_name = var.rg_name
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes = var.subnet_add_prefix

  delegation {
    name = var.aks_delegation_name
    service_delegation {
      name = "Microsoft.ContainerService/managedClusters"
      actions = [
        "Microsoft.Network/virtualNetworks/subnets/join"
      ]
    }
  }
}