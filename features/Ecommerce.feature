Feature: End-to-End Product Purchase and Order Lifecycle

  As a registered user
  I want to search, add products to my cart, and complete checkout
  So that I can successfully place and verify my order history

  Background:
    Given user is on the login page

  @WEB
  Scenario: Add product to cart and verify order workflow with static dataset
    When user logs in with credentials from JSON data
    And user adds product to cart from JSON data
    And user navigates to cart and proceeds to checkout
    And user completes payment using JSON payment details
    Then order confirmation message should be displayed and order ID generated
    And the placed order should be verified in the orders history page
    And user cancels the order and verifies it is deleted

@WEB
  Scenario: Add product2 to cart and verify order workflow with static dataset
    When user logs in with credentials from JSON data
    And user adds product to cart from JSON data
    And user navigates to cart and proceeds to checkout
    And user completes payment using JSON payment details
    Then order confirmation message should be displayed and order ID generated
    And the placed order should be verified in the orders history page
    And user cancels the order and verifies it is deleted