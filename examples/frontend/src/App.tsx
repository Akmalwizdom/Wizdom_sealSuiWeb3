// Copyright (c), Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import { Box, Button, Card, Container, Flex, Grid, Heading, Text, Theme } from '@radix-ui/themes';
import { CreateAllowlist } from './CreateAllowlist';
import { Allowlist } from './Allowlist';
import WalrusUpload from './EncryptAndUpload';
import { useState } from 'react';
import { CreateService } from './CreateSubscriptionService';
import FeedsToSubscribe from './SubscriptionView';
import { Service } from './SubscriptionService';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AllAllowlist } from './OwnedAllowlists';
import { AllServices } from './OwnedSubscriptionServices';
import Feeds from './AllowlistView';
import '@radix-ui/themes/styles.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <Heading as="h1" size="7" mb="6" align="center" className="gradient-text">
        Seal Access Control
      </Heading>
      <Text as="p" size="4" mb="6" align="center" color="gray">
        Secure content distribution on Sui
      </Text>
      
      <Grid columns="2" gap="6">
        <Card className="feature-card hover-card">
          <Flex direction="column" gap="4" align="center" style={{ height: '100%', padding: '2rem' }}>
            <div className="card-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-9)" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <line x1="19" y1="8" x2="19" y2="14"></line>
                <line x1="22" y1="11" x2="16" y2="11"></line>
              </svg>
            </div>
            <Heading as="h2" size="5">Allowlist</Heading>
            <Text as="p" size="3" color="gray" align="center">
              Whitelist specific addresses to access your encrypted content
            </Text>
            <Link to="/allowlist-example">
              <Button size="3" variant="soft" className="action-button">Get Started</Button>
            </Link>
          </Flex>
        </Card>
        
        <Card className="feature-card hover-card">
          <Flex direction="column" gap="4" align="center" style={{ height: '100%', padding: '2rem' }}>
            <div className="card-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-9)" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <Heading as="h2" size="5">Subscription</Heading>
            <Text as="p" size="3" color="gray" align="center">
              Monetize your content with time-limited subscriptions
            </Text>
            <Link to="/subscription-example">
              <Button size="3" variant="soft" className="action-button">Get Started</Button>
            </Link>
          </Flex>
        </Card>
      </Grid>
    </div>
  );
}

function App() {
  const currentAccount = useCurrentAccount();
  const [recipientAllowlist, setRecipientAllowlist] = useState<string>('');
  const [capId, setCapId] = useState<string>('');
  
  return (
    <Theme appearance="dark" accentColor="violet" grayColor="slate" radius="medium">
      <style jsx global>{`
        body {
          background-color: var(--color-background);
          color: var(--gray-12);
        }
        .gradient-text {
          background: linear-gradient(90deg, var(--accent-9), var(--accent-11));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          display: inline-block;
        }
        .hover-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          transition: all 0.2s ease;
        }
        .action-button {
          background: var(--accent-9);
          color: white;
        }
        .action-button:hover {
          background: var(--accent-10);
        }
        .card-icon {
          background: var(--accent-3);
          padding: 1rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .footer {
          padding: 1rem 0;
          margin-top: 2rem;
          border-top: 1px solid var(--slate-6);
        }
      `}</style>
      
      <Container size="3" style={{ padding: '2rem', minHeight: '90vh' }}>
        <Flex position="sticky" px="4" py="3" justify="between" align="center" style={{ 
          backgroundColor: 'var(--color-panel)',
          borderBottom: '1px solid var(--slate-6)',
          top: 0,
          zIndex: 1000,
          backdropFilter: 'blur(8px)'
        }}>
          <Flex align="center" gap="4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-9)" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <Heading as="h1" size="5">Seal</Heading>
          </Flex>
          <Box>
            <ConnectButton 
              style={{ 
                backgroundColor: 'var(--accent-9)',
                color: 'white',
                borderRadius: 'var(--radius-3)',
                padding: 'var(--space-2) var(--space-3)'
              }} 
            />
          </Box>
        </Flex>

        <Card style={{ 
          margin: '2rem 0', 
          backgroundColor: 'var(--slate-2)',
          border: '1px solid var(--slate-6)'
        }}>
          <Flex direction="column" gap="3">
            <Heading as="h2" size="4">Getting Started</Heading>
            <Text as="p" size="2">
              <strong>1.</strong> Code is available{' '}
              <a href="https://github.com/MystenLabs/seal/tree/main/examples" style={{ color: 'var(--accent-9)' }}>here</a>.
            </Text>
            <Text as="p" size="2">
              <strong>2.</strong> Testnet only. Get test tokens from{' '}
              <a href="https://faucet.sui.io/" style={{ color: 'var(--accent-9)' }}>faucet.sui.io</a>.
            </Text>
            <Text as="p" size="2">
              <strong>3.</strong> Files are stored temporarily on Walrus Testnet.
            </Text>
          </Flex>
        </Card>

        {currentAccount ? (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/allowlist-example/*"
                element={
                  <Routes>
                    <Route path="/" element={<CreateAllowlist />} />
                    <Route
                      path="/admin/allowlist/:id"
                      element={
                        <div className="admin-panel">
                          <Card style={{ marginBottom: '2rem' }}>
                            <Allowlist
                              setRecipientAllowlist={setRecipientAllowlist}
                              setCapId={setCapId}
                            />
                          </Card>
                          <Card>
                            <WalrusUpload
                              policyObject={recipientAllowlist}
                              cap_id={capId}
                              moduleName="allowlist"
                            />
                          </Card>
                        </div>
                      }
                    />
                    <Route path="/admin/allowlists" element={<AllAllowlist />} />
                    <Route
                      path="/view/allowlist/:id"
                      element={
                        <Card>
                          <Feeds suiAddress={currentAccount.address} />
                        </Card>
                      }
                    />
                  </Routes>
                }
              />
              <Route
                path="/subscription-example/*"
                element={
                  <Routes>
                    <Route path="/" element={<CreateService />} />
                    <Route
                      path="/admin/service/:id"
                      element={
                        <div className="admin-panel">
                          <Card style={{ marginBottom: '2rem' }}>
                            <Service
                              setRecipientAllowlist={setRecipientAllowlist}
                              setCapId={setCapId}
                            />
                          </Card>
                          <Card>
                            <WalrusUpload
                              policyObject={recipientAllowlist}
                              cap_id={capId}
                              moduleName="subscription"
                            />
                          </Card>
                        </div>
                      }
                    />
                    <Route path="/admin/services" element={<AllServices />} />
                    <Route
                      path="/view/service/:id"
                      element={
                        <Card>
                          <FeedsToSubscribe suiAddress={currentAccount.address} />
                        </Card>
                      }
                    />
                  </Routes>
                }
              />
            </Routes>
          </BrowserRouter>
        ) : (
          <Card style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'var(--slate-2)' }}>
            <Heading as="h2" size="5" mb="3">Connect Your Wallet</Heading>
            <Text as="p" size="3" color="gray" mb="4">
              Please connect your wallet to explore Seal access control
            </Text>
            <ConnectButton 
              style={{ 
                backgroundColor: 'var(--accent-9)',
                color: 'white',
                borderRadius: 'var(--radius-3)',
                padding: 'var(--space-3) var(--space-4)',
                fontSize: 'var(--font-size-3)'
              }} 
            />
          </Card>
        )}
      </Container>

      <footer className="footer">
        <Container size="3">
          <Flex justify="between" align="center">
            <Text size="2" color="gray">
              © {new Date().getFullYear()} Mysten Labs, Inc.
            </Text>
            <Text size="2" color="gray">
              <a href="https://mystenlabs.com" style={{ color: 'var(--accent-9)' }}>mystenlabs.com</a>
            </Text>
          </Flex>
        </Container>
      </footer>
    </Theme>
  );
}

export default App;
