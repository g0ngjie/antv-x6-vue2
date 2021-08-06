export default [
    {
        shape: 'edge',
        attrs: {
            line: {
                stroke: '#808080',
                strokeWidth: 1,
                strokeDasharray: ''
            }
        },
        id: 'bf8d1c70-857d-41bb-8271-280a3a104824',
        zIndex: -1,
        source: {
            cell: '32f1b845-9232-4051-b742-8bbf1c7d23a1',
            port: 'p_bottom'
        },
        target: {
            cell: 'a4288f97-97c1-4bcd-8c28-fcd9a94f056b',
            port: 'p_top'
        }
    },
    {
        shape: 'edge',
        attrs: {
            line: {
                stroke: '#808080',
                strokeWidth: 1,
                strokeDasharray: ''
            }
        },
        id: 'f4ce3de8-c388-41ee-9833-ef6e1f1dba2a',
        zIndex: -1,
        source: {
            cell: 'a4288f97-97c1-4bcd-8c28-fcd9a94f056b',
            port: 'p_bottom'
        },
        target: {
            cell: '4291dc4c-c346-4727-895b-e472616e94b7',
            port: 'p_top'
        }
    },
    {
        shape: 'edge',
        attrs: {
            line: {
                stroke: '#808080',
                strokeWidth: 1,
                strokeDasharray: ''
            }
        },
        id: 'ce3efe66-30bd-4682-b00f-980fd5598255',
        zIndex: -1,
        source: {
            cell: '4291dc4c-c346-4727-895b-e472616e94b7',
            port: 'p_bottom'
        },
        target: {
            cell: '2a156147-d9df-4311-b81a-dffd98928800',
            port: 'p_top'
        }
    },
    {
        shape: 'edge',
        attrs: {
            line: {
                stroke: '#808080',
                strokeWidth: 1,
                strokeDasharray: ''
            }
        },
        id: '7391f9bd-bbe8-463f-bcb9-9fe529c554d9',
        zIndex: -1,
        source: {
            cell: '2a156147-d9df-4311-b81a-dffd98928800',
            port: 'p_bottom'
        },
        target: {
            cell: 'd4a68d9e-2e53-41a3-9983-81a47052c60c',
            port: 'p_top'
        }
    },
    {
        shape: 'edge',
        attrs: {
            line: {
                stroke: '#808080',
                strokeWidth: 1,
                strokeDasharray: ''
            }
        },
        id: 'ec9132e0-8711-4f66-992b-6368e3af9347',
        zIndex: -1,
        source: {
            cell: '2a156147-d9df-4311-b81a-dffd98928800',
            port: 'p_right'
        },
        target: {
            cell: 'fe0b0e6c-10ea-4c44-b254-e305eca02460',
            port: 'p_top'
        }
    },
    {
        shape: 'edge',
        attrs: {
            line: {
                stroke: '#808080',
                strokeWidth: 1,
                strokeDasharray: ''
            }
        },
        id: '527f2093-ea6d-49ed-9246-3ee69e3649ab',
        zIndex: -1,
        source: {
            cell: 'fe0b0e6c-10ea-4c44-b254-e305eca02460',
            port: 'p_bottom'
        },
        target: {
            cell: 'd4a68d9e-2e53-41a3-9983-81a47052c60c',
            port: 'p_right'
        }
    },
    {
        position: {
            x: 210,
            y: 50
        },
        shape: 'tail-node',
        id: '32f1b845-9232-4051-b742-8bbf1c7d23a1',
        zIndex: 1
    },
    {
        position: {
            x: 210,
            y: 500
        },
        shape: 'tail-node',
        ports: {
            items: [
                {
                    group: 'port_g',
                    id: 'p_top',
                    connected: true
                },
                {
                    group: 'port_g',
                    id: 'p_right',
                    connected: true
                },
                {
                    group: 'port_g',
                    id: 'p_bottom'
                },
                {
                    group: 'port_g',
                    id: 'p_left'
                }
            ],
            groups: {
                port_g: {
                    attrs: {
                        circle: {
                            r: 4,
                            magnet: true,
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                            fill: '#fff'
                        }
                    },
                    position: 'ellipseSpread'
                }
            }
        },
        id: 'd4a68d9e-2e53-41a3-9983-81a47052c60c',
        zIndex: 2
    },
    {
        position: {
            x: 180,
            y: 140
        },
        shape: 'tail-node',
        ports: {
            items: [
                {
                    group: 'in',
                    id: 'p_top',
                    connected: true
                },
                {
                    group: 'right-out',
                    id: 'p_right'
                },
                {
                    group: 'bottom-out',
                    id: 'p_bottom'
                },
                {
                    group: 'left-out',
                    id: 'p_left'
                }
            ],
            groups: {
                in: {
                    position: 'top',
                    zIndex: 1,
                    attrs: {
                        circle: {
                            r: 4,
                            magnet: true,
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                            fill: '#fff'
                        }
                    }
                },
                'bottom-out': {
                    position: 'bottom',
                    zIndex: 1,
                    attrs: {
                        circle: {
                            r: 4,
                            magnet: true,
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                            fill: '#fff'
                        }
                    }
                },
                'right-out': {
                    position: 'right',
                    zIndex: 20,
                    attrs: {
                        circle: {
                            r: 4,
                            magnet: true,
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                            fill: '#fff'
                        }
                    }
                },
                'left-out': {
                    position: 'left',
                    zIndex: 20,
                    attrs: {
                        circle: {
                            r: 4,
                            magnet: true,
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                            fill: '#fff'
                        }
                    }
                }
            }
        },
        id: 'a4288f97-97c1-4bcd-8c28-fcd9a94f056b',
        zIndex: 3
    },
    {
        position: {
            x: 180,
            y: 240
        },
        shape: 'condition-node',
        ports: {
            items: [
                {
                    group: 'in',
                    id: 'p_top',
                    connected: true
                },
                {
                    group: 'right-out',
                    id: 'p_right'
                },
                {
                    group: 'bottom-out',
                    id: 'p_bottom'
                },
                {
                    group: 'left-out',
                    id: 'p_left'
                }
            ],
            groups: {
                in: {
                    position: 'top',
                    zIndex: 20,
                    attrs: {
                        circle: {
                            r: 4,
                            magnet: true,
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                            fill: '#fff'
                        }
                    }
                },
                'bottom-out': {
                    position: 'bottom',
                    zIndex: 20,
                    attrs: {
                        circle: {
                            r: 4,
                            magnet: true,
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                            fill: '#fff'
                        }
                    }
                },
                'right-out': {
                    position: 'right',
                    zIndex: 20,
                    attrs: {
                        circle: {
                            r: 4,
                            magnet: true,
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                            fill: '#fff'
                        }
                    }
                },
                'left-out': {
                    position: 'left',
                    zIndex: 20,
                    attrs: {
                        circle: {
                            r: 4,
                            magnet: true,
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                            fill: '#fff'
                        }
                    }
                }
            }
        },
        id: '4291dc4c-c346-4727-895b-e472616e94b7',
        zIndex: 4
    },
    {
        position: {
            x: 210,
            y: 340
        },
        shape: 'condition-node',
        ports: {
            items: [
                {
                    group: 'in',
                    id: 'p_top',
                    args: {
                        dx: -20
                    },
                    connected: true
                },
                {
                    group: 'right-out',
                    id: 'p_right',
                    args: {
                        dy: -20
                    }
                },
                {
                    group: 'bottom-out',
                    id: 'p_bottom',
                    args: {
                        dx: 20
                    }
                },
                {
                    group: 'left-out',
                    id: 'p_left',
                    args: {
                        dy: 20
                    }
                }
            ],
            groups: {
                in: {
                    position: 'top',
                    zIndex: 1,
                    attrs: {
                        circle: {
                            r: 4,
                            magnet: true,
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                            fill: '#fff'
                        }
                    }
                },
                'bottom-out': {
                    position: 'bottom',
                    zIndex: 1,
                    attrs: {
                        circle: {
                            r: 4,
                            magnet: true,
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                            fill: '#fff'
                        }
                    }
                },
                'right-out': {
                    position: 'right',
                    zIndex: 20,
                    attrs: {
                        circle: {
                            r: 4,
                            magnet: true,
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                            fill: '#fff'
                        }
                    }
                },
                'left-out': {
                    position: 'left',
                    zIndex: 20,
                    attrs: {
                        circle: {
                            r: 4,
                            magnet: true,
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                            fill: '#fff'
                        }
                    }
                }
            }
        },
        id: '2a156147-d9df-4311-b81a-dffd98928800',
        zIndex: 5
    },
    {
        position: {
            x: 340,
            y: 410
        },
        shape: 'tail-node',
        ports: {
            items: [
                {
                    group: 'in',
                    id: 'p_top',
                    connected: true
                },
                {
                    group: 'right-out',
                    id: 'p_right'
                },
                {
                    group: 'bottom-out',
                    id: 'p_bottom'
                },
                {
                    group: 'left-out',
                    id: 'p_left'
                }
            ],
            groups: {
                in: {
                    position: 'top',
                    zIndex: 1,
                    attrs: {
                        circle: {
                            r: 4,
                            magnet: true,
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                            fill: '#fff'
                        }
                    }
                },
                'bottom-out': {
                    position: 'bottom',
                    zIndex: 1,
                    attrs: {
                        circle: {
                            r: 4,
                            magnet: true,
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                            fill: '#fff'
                        }
                    }
                },
                'right-out': {
                    position: 'right',
                    zIndex: 20,
                    attrs: {
                        circle: {
                            r: 4,
                            magnet: true,
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                            fill: '#fff'
                        }
                    }
                },
                'left-out': {
                    position: 'left',
                    zIndex: 20,
                    attrs: {
                        circle: {
                            r: 4,
                            magnet: true,
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                            fill: '#fff'
                        }
                    }
                }
            }
        },
        id: 'fe0b0e6c-10ea-4c44-b254-e305eca02460',
        zIndex: 6
    }
]