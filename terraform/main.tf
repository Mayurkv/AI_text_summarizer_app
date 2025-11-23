terraform {
    required_providers {
      azurerm = {
        source = "hashicorp/azurerm"
        version = "~>4.5.0"
      }
    }
    required_version = "=1.3.3"

}

provider "azurerm" {
  features {
    
  }
}

resource "azurerm_resource_group" "rg" {
  name = "ai-summary-rg-${var.env}"
  location = "${var.location}"
}