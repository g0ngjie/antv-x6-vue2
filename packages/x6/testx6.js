export default {
    "cells": [
        {
            "shape": "edge",
            "attrs": {
                "line": {
                    "stroke": "#7c68fc",
                    "strokeDasharray": ""
                }
            },
            "id": "18faf716-2dca-4c5b-8c18-01b53df6108b",
            "zIndex": -1,
            "source": {
                "cell": "fe0675e3-79b2-4ad9-8231-ab5c17c89a38",
                "port": "p_bottom"
            },
            "target": {
                "cell": "7a3fb5f7-16e0-4d09-961a-c2c14e41716a",
                "port": "p_top"
            },
            "labels": [
                {
                    "attrs": {
                        "label": {
                            "text": ""
                        }
                    }
                }
            ]
        },
        {
            "shape": "edge",
            "attrs": {
                "line": {
                    "stroke": "#7c68fc",
                    "strokeDasharray": ""
                }
            },
            "id": "29d054dd-0ada-4809-9f71-7941acf95ac1",
            "zIndex": -1,
            "source": {
                "cell": "7a3fb5f7-16e0-4d09-961a-c2c14e41716a",
                "port": "p_bottom"
            },
            "target": {
                "cell": "c8d5d18b-0a29-413a-ae07-1056ce5968a2",
                "port": "p_top"
            },
            "labels": [
                {
                    "attrs": {
                        "label": {
                            "text": ""
                        }
                    }
                }
            ]
        },
        {
            "position": {
                "x": 110,
                "y": 70
            },
            "shape": "begin-node",
            "id": "fe0675e3-79b2-4ad9-8231-ab5c17c89a38",
            "zIndex": 1
        },
        {
            "position": {
                "x": 160,
                "y": 178
            },
            "shape": "condition-node",
            "ports": {
                "items": [
                    {
                        "group": "in",
                        "id": "p_top",
                        "connected": true
                    },
                    {
                        "group": "out",
                        "id": "p_bottom"
                    }
                ],
                "groups": {
                    "in": {
                        "attrs": {
                            "circle": {
                                "r": 6,
                                "magnet": true,
                                "stroke": "#5b8ffa",
                                "strokeWidth": 1,
                                "fill": "#fff",
                                "transform": "translate(0, -7)"
                            }
                        },
                        "position": "top"
                    },
                    "out": {
                        "attrs": {
                            "circle": {
                                "r": 6,
                                "magnet": true,
                                "stroke": "#5b8ffa",
                                "strokeWidth": 1,
                                "fill": "#fff",
                                "transform": "translate(0, 7)"
                            }
                        },
                        "position": "bottom"
                    }
                }
            },
            "id": "7a3fb5f7-16e0-4d09-961a-c2c14e41716a",
            "zIndex": 2
        },
        {
            "position": {
                "x": 135,
                "y": 359
            },
            "shape": "tail-node",
            "ports": {
                "items": [
                    {
                        "group": "port-top",
                        "id": "p_top",
                        "connected": true
                    },
                    {
                        "group": "port-bottom",
                        "id": "p_bottom"
                    }
                ],
                "groups": {
                    "port-top": {
                        "position": "top",
                        "zIndex": 20,
                        "attrs": {
                            "circle": {
                                "r": 6,
                                "magnet": true,
                                "stroke": "#5b8ffa",
                                "strokeWidth": 1,
                                "fill": "#fff"
                            }
                        }
                    },
                    "port-bottom": {
                        "position": "bottom",
                        "zIndex": 20,
                        "attrs": {
                            "circle": {
                                "r": 6,
                                "magnet": true,
                                "stroke": "#5b8ffa",
                                "strokeWidth": 1,
                                "fill": "#fff"
                            }
                        }
                    }
                }
            },
            "id": "c8d5d18b-0a29-413a-ae07-1056ce5968a2",
            "zIndex": 3
        }
    ]
}